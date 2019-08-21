let ServoValue_Base = 90
let ServoValue_L = 90
let ServoValue_R = 90
let ServoValue_Clav = 75

let ServoValue_Base_Min = 10
let ServoValue_L_Min = 10
let ServoValue_R_Min = 60
let ServoValue_Clav_Min = 10

let ServoValue_Base_Max = 170
let ServoValue_L_Max = 140
let ServoValue_R_Max = 140
let ServoValue_Clav_Max = 90

let ServoValue_Base_Step = 1
let ServoValue_L_Step = 2
let ServoValue_R_Step = 2
let ServoValue_Clav_Step = 1

STEM6S2.PS2X_PAD_Init()
/*
serial.redirect(
SerialPin.P8,
SerialPin.P0,
BaudRate.BaudRate115200
)*/
/*
STEM6S2.onUltrasonic(4000, Ultrasoniccompare.small,()=>{
    STEM6S2.SetMecanum(MOTOR_Dir.Stop, 0) 
})

STEM6S2.onUltrasonic(4000, Ultrasoniccompare.big,()=>{
    STEM6S2.SetMecanum(MOTOR_Dir.Forward, 19999) 
})*/


STEM6S2.ServoMotor(pwmServo.Base, ServoValue_Base)
STEM6S2.ServoMotor(pwmServo.L,    ServoValue_L)
STEM6S2.ServoMotor(pwmServo.R,    ServoValue_R)
STEM6S2.ServoMotor(pwmServo.Clav, ServoValue_Clav)


//serial.writeLine("start")
basic.forever(function () {
    
    if (STEM6S2.UltrasonicDutyRead() > 20)
    {
        STEM6S2.SetMecanum(MOTOR_Dir.Forward, 19999) 
    }
    else if (STEM6S2.UltrasonicDutyRead()< 20)
    {
        STEM6S2.SetMecanum(MOTOR_Dir.Stop, 0)   
    }
/*
    if (STEM6S2.UltrasonicDutyCompare(Ultrasoniccompare.big,20))
    {
        STEM6S2.SetMecanum(MOTOR_Dir.Forward, 19999) 
    }
    else if (STEM6S2.UltrasonicDutyCompare(Ultrasoniccompare.small,20))
    {
        STEM6S2.SetMecanum(MOTOR_Dir.Stop, 0)   
    }*/

    STEM6S2.PS2X_PAD_Scan()
    if(STEM6S2.PS2X_GetButton(PS2XButton.PSB_PAD_UP))
    {
        if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_L2))
        {
            STEM6S2.SetMecanum(MOTOR_Dir.ForwardLeft, 19999)                       
        }
        else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_R2))
        {
            STEM6S2.SetMecanum(MOTOR_Dir.ForwardRight, 19999)                 
        }
        else 
        {
            STEM6S2.SetMecanum(MOTOR_Dir.Forward, 19999)      
        }
    }
    else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_PAD_DOWN))
    {
        if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_L2))
        {
            STEM6S2.SetMecanum(MOTOR_Dir.BackLeft, 19999)                       
        }
        else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_R2))
        {
            STEM6S2.SetMecanum(MOTOR_Dir.BackRight, 19999)      
        }      
        else
        {
            STEM6S2.SetMecanum(MOTOR_Dir.Back, 19999)      
        }
    }
    else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_PAD_LEFT))
    {
        STEM6S2.SetMecanum(MOTOR_Dir.TurnLeft, 19999) 
    }
    else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_PAD_RIGHT))
    {
        STEM6S2.SetMecanum(MOTOR_Dir.TurnRight, 19999) 
    }   

    else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_L1))
    {
        STEM6S2.SetMecanum(MOTOR_Dir.Left, 19999) 
    }
    else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_R1))
    {
        STEM6S2.SetMecanum(MOTOR_Dir.Right, 19999) 
    } 
    else
    {
    //    STEM6S2.SetMecanum(MOTOR_Dir.Stop,0)
    }


    if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_SQUARE))
    {
        STEM6S2.ServoMotor(pwmServo.Base, 180)
    }
    else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_CIRCLE))
    {
        STEM6S2.ServoMotor(pwmServo.Base, 0)
    }
    else if (STEM6S2.PS2X_GetButton(PS2XButton.PSB_TRIANGLE))
    {
        STEM6S2.ServoMotor(pwmServo.Base, 90)
    }



    if (STEM6S2.PS2X_Analog(PS2XButtonADC.PSS_LX) > 240)
    {
        ServoValue_Base = ServoValue_Base + ServoValue_Base_Step 
        if (ServoValue_Base >= ServoValue_Base_Max)
            ServoValue_Base = ServoValue_Base_Max
   
        STEM6S2.ServoMotor(pwmServo.Base, ServoValue_Base)
    }
    else if (STEM6S2.PS2X_Analog(PS2XButtonADC.PSS_LX) < 10)
    {
        ServoValue_Base = ServoValue_Base - ServoValue_Base_Step
        if (ServoValue_Base < ServoValue_Base_Min)
            ServoValue_Base = ServoValue_Base_Min
         
        STEM6S2.ServoMotor(pwmServo.Base, ServoValue_Base)
    }

   
    

    if (STEM6S2.PS2X_Analog(PS2XButtonADC.PSS_RX) > 240)
    {
          
        ServoValue_Clav = ServoValue_Clav + ServoValue_Clav_Step 
        if (ServoValue_Clav >= ServoValue_Clav_Max)
            ServoValue_Clav = ServoValue_Clav_Max      
        STEM6S2.ServoMotor(pwmServo.Clav, ServoValue_Clav)
    }
    else if (STEM6S2.PS2X_Analog(PS2XButtonADC.PSS_RX) < 10)
    {
        ServoValue_Clav = ServoValue_Clav - ServoValue_Clav_Step 

        if (ServoValue_Clav < ServoValue_Clav_Min)
            ServoValue_Clav = ServoValue_Clav_Min 
        STEM6S2.ServoMotor(pwmServo.Clav, ServoValue_Clav)
    }


    if (STEM6S2.PS2X_Analog(PS2XButtonADC.PSS_LY) > 240)
    {
        ServoValue_L = ServoValue_L + ServoValue_L_Step 
        if (ServoValue_L > ServoValue_L_Max)
            ServoValue_L = ServoValue_L_Max      
        STEM6S2.ServoMotor(pwmServo.L, ServoValue_L)
    }
    else if (STEM6S2.PS2X_Analog(PS2XButtonADC.PSS_LY) < 10)
    {
        ServoValue_L = ServoValue_L - ServoValue_L_Step
        if (ServoValue_L < ServoValue_L_Min)
            ServoValue_L = ServoValue_L_Min
        STEM6S2.ServoMotor(pwmServo.L, ServoValue_L)
    }


    if (STEM6S2.PS2X_Analog(PS2XButtonADC.PSS_RY) < 10)
    {
        ServoValue_R = ServoValue_R + ServoValue_R_Step 
        if (ServoValue_R > ServoValue_R_Max)
            ServoValue_R = ServoValue_R_Max        
        STEM6S2.ServoMotor(pwmServo.R, ServoValue_R)
    }
    else if (STEM6S2.PS2X_Analog(PS2XButtonADC.PSS_RY) > 240)
    {
        ServoValue_R = ServoValue_R - ServoValue_R_Step
        if (ServoValue_R < ServoValue_R_Min)
            ServoValue_R = ServoValue_R_Min
        STEM6S2.ServoMotor(pwmServo.R, ServoValue_R)
    }

})








/*
STEM6S2.PS2X_PAD_Init()
serial.redirect(
    SerialPin.P8,
    SerialPin.P0,
    BaudRate.BaudRate115200
    )
serial.writeLine("start")

basic.forever(function () {
    STEM6S2.PS2X_PAD_Scan()
    if (STEM6S2.PS2X_Button(PS2XButton.PSB_SELECT, PS2XButtonAction.Pressed)) {
    	serial.writeLine("1")
    }
    if (STEM6S2.PS2X_Button(PS2XButton.PSB_L1, PS2XButtonAction.Pressed)) {
    	serial.writeLine("2")
    }
    if (STEM6S2.PS2X_Button(PS2XButton.PSB_L2, PS2XButtonAction.Pressed)) {
    	serial.writeLine("3")
    }
    if (STEM6S2.PS2X_Button(PS2XButton.PSB_SELECT, PS2XButtonAction.Released)) {
    	serial.writeLine("4")
    }
    if (STEM6S2.PS2X_Button(PS2XButton.PSB_L1, PS2XButtonAction.Released)) {
    	serial.writeLine("5")
    }
    if (STEM6S2.PS2X_Button(PS2XButton.PSB_L2, PS2XButtonAction.Released)) {
    	serial.writeLine("6")
    }
})
*/
/*


STEM6S2.onPS2Button(PS2XButton.PSB_PAD_UP, PS2XButtonAction.Pressed, function () {
    serial.writeLine("2")
})
STEM6S2.onPS2Button(PS2XButton.PSB_PAD_RIGHT, PS2XButtonAction.Pressed, function () {
    serial.writeLine("3")
})
STEM6S2.onPS2Button(PS2XButton.PSB_SELECT, PS2XButtonAction.Released, function () {
    serial.writeLine("4")
})
STEM6S2.onPS2Button(PS2XButton.PSB_PAD_UP, PS2XButtonAction.Released, function () {
    serial.writeLine("5")
})
STEM6S2.onPS2Button(PS2XButton.PSB_PAD_RIGHT, PS2XButtonAction.Released, function () {
    serial.writeLine("6")
})
STEM6S2.PS2X_INIT()
serial.redirect(
SerialPin.P8,
SerialPin.P0,
BaudRate.BaudRate115200
)
serial.writeLine("start")
*/