/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

/**
 * 自定义图形块
 */
const enum pwmout{
    ML_PWMA = 0,
    ML_PWMB = 5,

    MR_PWMA = 10,
    MR_PWMB = 15,

    PWM1 = 6,
    PWM2 = 7,
    PWM3 = 8,
    PWM4 = 9,

    LAIN2 = 1,
    LAIN1 = 2,
    LBIN1 = 3,
    LBIN2 = 4,

    
    RAIN2 = 11,
    RAIN1 = 12,
    RBIN1 = 13,
    RBIN2 = 14,   
}

const enum pwmMecanum{
    LA_Forward = pwmout.LAIN2, 
    LA_Back    = pwmout.LAIN1,

    LB_Forward = pwmout.LBIN2, 
    LB_Back    = pwmout.LBIN1,

    RA_Forward = pwmout.RAIN1, 
    RA_Back    = pwmout.RAIN2,

    RB_Forward = pwmout.RBIN1, 
    RB_Back    = pwmout.RBIN2
}

const enum pwmServo{
    //% block="底座舵机" 
    Base    = pwmout.PWM1,
    //% block="左边舵机"
    L       = pwmout.PWM2,
    //% block="右边舵机"
    R       = pwmout.PWM3,
    //% block="夹子舵机"
    Clav    = pwmout.PWM4    
}


const enum MOTOR_Dir {  
    //% block="前进"     
    Forward = 0,
    //% block="后退" 
    Back = 1,

    //% block="右转"                    
    TurnRight = 2,
    //% block="左转"  
    TurnLeft= 3,

    //% block="横向左"                    
    Left = 4,
    //% block="横向右"  
    Right= 5,    
    
    
    //% block="斜左前" 
    ForwardLeft = 6,
    //% block="斜右前" 
    ForwardRight = 7,

    //% block="斜左后" 
    BackLeft = 8,
    //% block="斜右后" 
    BackRight = 9,

    //% block="停止" 
    Stop = 10
}

namespace STEM6S2 {
    const PCA9685_ADDRESS = 0x41
    const MODE1 = 0x00
    const MODE2 = 0x01
    const SUBADR1 = 0x02
    const SUBADR2 = 0x03
    const SUBADR3 = 0x04
    const PRESCALE = 0xFE
    const LED0_ON_L = 0x06
    const LED0_ON_H = 0x07
    const LED0_OFF_L = 0x08
    const LED0_OFF_H = 0x09
    const ALL_LED_ON_L = 0xFA
    const ALL_LED_ON_H = 0xFB
    const ALL_LED_OFF_L = 0xFC
    const ALL_LED_OFF_H = 0xFD

    const STP_CHA_L = 2047
    const STP_CHA_H = 4095

    const STP_CHB_L = 1
    const STP_CHB_H = 2047

    const STP_CHC_L = 1023
    const STP_CHC_H = 3071

    const STP_CHD_L = 3071
    const STP_CHD_H = 1023

 

    let initialized = false
    


    function i2cwrite(addr: number, reg: number, value: number) {
        let buf = pins.createBuffer(2)
        buf[0] = reg
        buf[1] = value
        pins.i2cWriteBuffer(addr, buf)
    }

    function i2cread(addr: number, reg: number) {
        pins.i2cWriteNumber(addr, reg, NumberFormat.UInt8BE);
        let val = pins.i2cReadNumber(addr, NumberFormat.UInt8BE);
        return val;
    }

    function initPCA9685(): void {
        i2cwrite(PCA9685_ADDRESS, MODE1, 0x00)
        setFreq(50);
        for (let idx = 0; idx < 16; idx++) {
            setPwm(idx, 0, 0);
        }
        initialized = true
    }

    function setFreq(freq: number): void {
        // Constrain the frequency
        let prescaleval = 25000000;
        prescaleval /= 4096;
        prescaleval /= freq;
        prescaleval -= 1;
        let prescale = prescaleval; //Math.Floor(prescaleval + 0.5);
        let oldmode = i2cread(PCA9685_ADDRESS, MODE1);
        let newmode = (oldmode & 0x7F) | 0x10; // sleep
        i2cwrite(PCA9685_ADDRESS, MODE1, newmode); // go to sleep
        i2cwrite(PCA9685_ADDRESS, PRESCALE, prescale); // set the prescaler
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode);
        control.waitMicros(5000);
        i2cwrite(PCA9685_ADDRESS, MODE1, oldmode | 0xa1);
    }

    function setPwm(channel: number, on: number, off: number): void {
        if (channel < 0 || channel > 15)
            return;

        let buf = pins.createBuffer(5);
        buf[0] = LED0_ON_L + 4 * channel;
        buf[1] = on & 0xff;
        buf[2] = (on >> 8) & 0xff;
        buf[3] = off & 0xff;
        buf[4] = (off >> 8) & 0xff;
        pins.i2cWriteBuffer(PCA9685_ADDRESS, buf);
    }

	/**
	 * Servo Execute
	 * @param degree [0-180] degree of servo; eg: 90, 0, 180
	*/
    //% subcategory="机械臂"
    //% blockId=setServoMotor block="电机 方向选择|%channel|角度 %degree"
    //% weight=85
    //% degree.min=0 degree.max=180
    export function ServoMotor(channel: pwmServo,degree: number): void {
		if (!initialized) {
            initPCA9685();
        }
		// 50hz: 20,000 us
        let v_us = (degree * 1800 / 180 + 600); // 0.6 ~ 2.4
        let value = v_us * 4096 / 20000;
        setPwm(channel, 0, value);
    }
	

	/**
	 * Servo Execute
	 * @param pulse [0-19999] pulse of servo; eg: 1500, 500, 2500
	*/
    //% subcategory="麦克纳姆轮小车"
    //% blockId=SetMecanum 
    //% block="选择|%MOTOR_Dir|方向速度设为|%pulse"
    //% weight=85
    //% pulse.min=0 pulse.max=19999
    export function SetMecanum(Dir:MOTOR_Dir,pulse: number): void {
		if (!initialized) {
            initPCA9685();
        }
		// 50hz: 20,000 us
        let value = pulse * 4096 / 20000;


      /*  setPwm(pwmMecanum.LA_Forward, 0, 0);
        setPwm(pwmMecanum.LB_Forward, 0, 0);
        setPwm(pwmMecanum.RA_Forward, 0, 0);
        setPwm(pwmMecanum.RB_Forward, 0, 0);
 
        setPwm(pwmMecanum.LA_Back, 0, 0);
        setPwm(pwmMecanum.LB_Back, 0, 0);
        setPwm(pwmMecanum.RA_Back, 0, 0);
        setPwm(pwmMecanum.RB_Back, 0, 0);
        basic.pause(100)
        */
        setPwm(pwmout.ML_PWMA, 0, value);
        setPwm(pwmout.ML_PWMB, 0, value);
        setPwm(pwmout.MR_PWMA, 0, value);
        setPwm(pwmout.MR_PWMB, 0, value);

            
        if (Dir == MOTOR_Dir.Forward) 
        {
            setPwm(pwmMecanum.LA_Back, 0, 0);
            setPwm(pwmMecanum.LB_Back, 0, 0);    
            setPwm(pwmMecanum.RA_Back, 0, 0);
            setPwm(pwmMecanum.RB_Back, 0, 0); 

            setPwm(pwmMecanum.LA_Forward, 0, 4095);
            setPwm(pwmMecanum.LB_Forward, 0, 4095);
            setPwm(pwmMecanum.RA_Forward, 0, 4095);
            setPwm(pwmMecanum.RB_Forward, 0, 4095);  

        }   
        else if (Dir == MOTOR_Dir.Back)
        {
            setPwm(pwmMecanum.LA_Forward, 0, 0);
            setPwm(pwmMecanum.LB_Forward, 0, 0);
            setPwm(pwmMecanum.RA_Forward, 0, 0);
            setPwm(pwmMecanum.RB_Forward, 0, 0);  

            setPwm(pwmMecanum.LA_Back, 0, 4095);
            setPwm(pwmMecanum.LB_Back, 0, 4095);
            setPwm(pwmMecanum.RA_Back, 0, 4095);
            setPwm(pwmMecanum.RB_Back, 0, 4095);   
        } 
        else if (Dir == MOTOR_Dir.Right)
        {
            setPwm(pwmMecanum.LA_Back, 0, 0);
            setPwm(pwmMecanum.LB_Forward, 0, 0);
            setPwm(pwmMecanum.RA_Forward, 0, 0);
            setPwm(pwmMecanum.RB_Back, 0, 0); 

            setPwm(pwmMecanum.LA_Forward, 0, 4095);
            setPwm(pwmMecanum.LB_Back, 0, 4095);
            setPwm(pwmMecanum.RA_Back, 0, 4095);
            setPwm(pwmMecanum.RB_Forward, 0, 4095);   
        }
        else if (Dir == MOTOR_Dir.Left)
        {
            setPwm(pwmMecanum.LA_Forward, 0, 0);
            setPwm(pwmMecanum.LB_Back, 0, 0);
            setPwm(pwmMecanum.RA_Back, 0, 0);
            setPwm(pwmMecanum.RB_Forward, 0, 0);  

            setPwm(pwmMecanum.LA_Back, 0, 4095);
            setPwm(pwmMecanum.LB_Forward, 0, 4095);
            setPwm(pwmMecanum.RA_Forward, 0, 4095);
            setPwm(pwmMecanum.RB_Back, 0, 4095);   
        } 
        else if (Dir == MOTOR_Dir.TurnRight)
        {
            setPwm(pwmMecanum.LA_Back, 0, 0);
            setPwm(pwmMecanum.LB_Back, 0, 0);
            setPwm(pwmMecanum.RA_Forward, 0, 0);
            setPwm(pwmMecanum.RB_Forward, 0, 0); 

            setPwm(pwmMecanum.LA_Forward, 0, 4095);
            setPwm(pwmMecanum.LB_Forward, 0, 4095);
            setPwm(pwmMecanum.RA_Back, 0, 4095);
            setPwm(pwmMecanum.RB_Back, 0, 4095);   
        }  
        else if (Dir == MOTOR_Dir.TurnLeft)
        {
            setPwm(pwmMecanum.LA_Forward, 0, 0);
            setPwm(pwmMecanum.LB_Forward, 0, 0);
            setPwm(pwmMecanum.RA_Back, 0, 0);
            setPwm(pwmMecanum.RB_Back, 0, 0); 

            setPwm(pwmMecanum.LA_Back, 0, 4095);
            setPwm(pwmMecanum.LB_Back, 0, 4095);
            setPwm(pwmMecanum.RA_Forward, 0, 4095);
            setPwm(pwmMecanum.RB_Forward, 0, 4095);   
        } 
        else if (Dir == MOTOR_Dir.ForwardRight)
        {
            setPwm(pwmMecanum.LB_Forward, 0, 0);
            setPwm(pwmMecanum.RA_Forward, 0, 0);  
            setPwm(pwmMecanum.LA_Back, 0, 0);
            setPwm(pwmMecanum.LB_Back, 0, 0);
            setPwm(pwmMecanum.RA_Back, 0, 0);
            setPwm(pwmMecanum.RB_Back, 0, 0);

            setPwm(pwmMecanum.LA_Forward, 0, 4095);
            setPwm(pwmMecanum.RB_Forward, 0, 4095);   
        }         
        else if (Dir == MOTOR_Dir.ForwardLeft)
        {
            setPwm(pwmMecanum.LA_Forward, 0, 0);
            setPwm(pwmMecanum.RB_Forward, 0, 0);
     
            setPwm(pwmMecanum.LA_Back, 0, 0);
            setPwm(pwmMecanum.LB_Back, 0, 0);
            setPwm(pwmMecanum.RA_Back, 0, 0);
            setPwm(pwmMecanum.RB_Back, 0, 0);

            setPwm(pwmMecanum.LB_Forward, 0, 4095);
            setPwm(pwmMecanum.RA_Forward, 0, 4095);   
        }           

        else if (Dir == MOTOR_Dir.BackLeft)
        {
            setPwm(pwmMecanum.LA_Forward, 0, 0);
            setPwm(pwmMecanum.LB_Forward, 0, 0);
            setPwm(pwmMecanum.RA_Forward, 0, 0);
            setPwm(pwmMecanum.RB_Forward, 0, 0);
     
            setPwm(pwmMecanum.LB_Back, 0, 0);
            setPwm(pwmMecanum.RA_Back, 0, 0);

            setPwm(pwmMecanum.LA_Back, 0, 4095);
            setPwm(pwmMecanum.RB_Back, 0, 4095);   
        }         
        else if (Dir == MOTOR_Dir.BackRight)
        {
            setPwm(pwmMecanum.LA_Forward, 0, 0);
            setPwm(pwmMecanum.LB_Forward, 0, 0);
            setPwm(pwmMecanum.RA_Forward, 0, 0);
            setPwm(pwmMecanum.RB_Forward, 0, 0);
     
            setPwm(pwmMecanum.LA_Back, 0, 0);
            setPwm(pwmMecanum.RB_Back, 0, 0);

            setPwm(pwmMecanum.LB_Back, 0, 4095);
            setPwm(pwmMecanum.RA_Back, 0, 4095);   
        }   
    }
}
