STEM6S2.PS2X_INIT()

STEM6S2.onPS2Button(PS2XButton.PSB_SELECT, PS2XButtonAction.Pressed,function () {
    basic.showLeds(`
    . # # # .
    . . # . .
    . . # . .
    . . # . .
    . # # # .
    `)      
    basic.pause(2000) 
    basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `) 
})


/*
control.inBackground(function () {
    PS2X_PAD.PS2X_PAD_Init()
    while(true)
    {
        basic.pause(100)
        PS2X_PAD.PS2X_PAD_Scan()
        if (PS2X_PAD.PS2X_Key(1))
        {
            basic.pause(2000) 
            control.raiseEvent(
                EventBusSource.MICROBIT_ID_BUTTON_A,
                EventBusValue.MES_DPAD_BUTTON_D_DOWN
                )
        }        
    }
})

control.onEvent(EventBusSource.MICROBIT_ID_BUTTON_A, EventBusValue.MES_DPAD_BUTTON_D_DOWN, function () {
    basic.showLeds(`
    . # # # .
    . . # . .
    . . # . .
    . . # . .
    . # # # .
    `)      
    basic.pause(2000) 
    basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `) 
})

*/
/*
basic.forever(function () {
    basic.pause(100);
    if (PS2X_PAD.PS2X_Key(1))
    {
        basic.pause(2000) 
    }
})    


PS2X_PAD.onPS2Button(1,1, function () {
    basic.pause(10000)
}
);
PS2X_PAD.onPS2Button(128,1, function () {
    basic.pause(10000)
}
);
*/
/*
basic.forever(function () {
    isPS2X_Key()
    if (PS2X_PAD.PS2X_Key(1))
    {
            
    }
    basic.pause(200)
})*/



/*basic.showLeds(`
    . # # # .
    . . # . .
    . . # . .
    . . # . .
    . # # # .
    `)
PS2X_PAD.PS2X_PAD_Init()
basic.forever(function () {
    if (PS2X_PAD.PS2X_Key(1)) {
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . # # # .
            `)
    } else if (PS2X_PAD.PS2X_Key(2)) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . # # # .
            . # . . .
            . # # # .
            `)
    }
    control.waitMicros(10000)
})
*/