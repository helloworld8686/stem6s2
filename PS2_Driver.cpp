/*****************************************************************************
* | File        :   LCD_Driver.c
* | Author      :   Waveshare team
* | Function    :   ILI9486 Drive function
* | Info        :
*   Image scanning
*      Please use progressive scanning to generate images or fonts
*----------------
* | This version:   V1.0
* | Date        :   2018-01-11
* | Info        :   Basic version
*
******************************************************************************/
#include "MicroBitPin.h"
#include "mbed.h"
#include "PS2_Driver.h"


//spi
SPI PS2_spi(MOSI, MISO, SCK);
#define PS2_SPI_Write_Byte(value) PS2_spi.write(value)
#define PS2_SPI_Read_Byte(value) PS2_spi.write(value)

//PS2
DigitalOut PS2_CS(MICROBIT_PIN_P16);

#define LCD_CS_0 PS2_CS = 0
#define LCD_CS_1 PS2_CS = 1

//delay
#define Driver_Delay_ms(xms) wait_ms(xms)
#define D_Send_Delay    10  

static unsigned char enter_config[]={0x01,0x43,0x00,0x01,0x00};
static unsigned char set_mode[]={0x01,0x44,0x00,0x01,0x03,0x00,0x00,0x00,0x00};
static unsigned char set_bytes_large[]={0x01,0x4F,0x00,0xFF,0xFF,0x03,0x00,0x00,0x00};
static unsigned char exit_config[]={0x01,0x43,0x00,0x00,0x5A,0x5A,0x5A,0x5A,0x5A};
static unsigned char enable_rumble[]={0x01,0x4D,0x00,0x00,0x01};
static unsigned char type_read[]={0x01,0x45,0x00,0x5A,0x5A,0x5A,0x5A,0x5A,0x5A};

static unsigned char scan[9] = {0x01,0x42,0x00,0x00,0x00,0x00,0x00,0x00,0x00};

void PS2X::spi_init(void)
{
    PS2_spi.format(8,0);
    PS2_spi.frequency(9000000);   
}

void PS2X::sendCommandString(unsigned char * string, int len) 
{

    LCD_CS_0; // low enable joystick
    for (int y=0; y < len; y++)
        PS2_SPI_Write_Byte(string[y]);
    LCD_CS_1; //high disable joystick
    Driver_Delay_ms(D_Send_Delay); 
}



void PS2X::PS2_Init(void)
{
    spi_init();
    config_gamepad();
}

void PS2X::config_gamepad(){
    sendCommandString(enter_config, sizeof(enter_config));
    sendCommandString(set_mode, sizeof(set_mode));
    if (en_Rumble)
        sendCommandString(enable_rumble, sizeof(enable_rumble));
    if (en_Pressures)
        sendCommandString(set_bytes_large, sizeof(set_bytes_large));
    sendCommandString(exit_config, sizeof(exit_config));
}

void PS2X::enableRumble() {
    sendCommandString(enter_config, sizeof(enter_config));
    sendCommandString(enable_rumble, sizeof(enable_rumble));
    sendCommandString(exit_config, sizeof(exit_config));
    en_Rumble = true;
}

/****************************************************************************************/
bool PS2X::enablePressures() {
    sendCommandString(enter_config, sizeof(enter_config));
    sendCommandString(set_bytes_large, sizeof(set_bytes_large));
    sendCommandString(exit_config, sizeof(exit_config));

    read_gamepad();
    read_gamepad();

    if(PS2data[1] != 0x79)
        return false;

    en_Pressures = true;
        return true;
}


bool PS2X::read_gamepad(void) {
    unsigned char dword2[12] = {0,0,0,0,0,0,0,0,0,0,0,0};
    double temp = 10;//system_timer_current_time_us() - last_read;
    if (temp > 1500) //waited to long
        config_gamepad();

    if(temp < read_delay)  //waited too short
        Driver_Delay_ms(read_delay - temp);

    for (int RetryCnt = 0; RetryCnt < 5; RetryCnt++)
    {
        LCD_CS_0; // low enable joystick
        for (int y=0; y < 9; y++)
            PS2data[y] = PS2_SPI_Read_Byte(scan[y]);

        if(PS2data[1] == 0x79) {  //if controller is in full data return mode, get the rest of data
            for (int i = 0; i<12; i++) {
                PS2data[i+9] = PS2_SPI_Read_Byte(dword2[i]);
            }
        }  
        LCD_CS_1; //high disable joystick
        if ((PS2data[1] & 0xf0) == 0x70)
            break;
        config_gamepad();    
        Driver_Delay_ms(read_delay);         
    }

    if ((PS2data[1] & 0xf0) != 0x70) {
        if (read_delay < 10)
            read_delay++;   // see if this helps out...
    }
    else
    {
        read_delay = 1;/* code */
    }
    

    last_buttons = buttons; 

    buttons =  (uint16_t)(PS2data[4] << 8) + PS2data[3];

    return ((PS2data[1] & 0xf0) == 0x70);  // 1 = OK = analog mode - 0 = NOK
}

bool PS2X::NewButtonState(unsigned int button) {
  return (((last_buttons ^ buttons) & button) > 0);
}

bool PS2X::Button(unsigned int button) {
  return ((~buttons & button) > 0);
}

bool PS2X::ButtonPressed(unsigned int button) {
  return(NewButtonState(button) & Button(button));
}

bool PS2X::ButtonReleased(unsigned int button) {
  return((NewButtonState(button)) & ((~last_buttons & button) > 0));
}

