
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