#include "pxt.h"
#include "PID_v1.h"

using namespace pxt;

namespace STEM6S2 {
    double originalSetpoint = 0;
    double setpoint = originalSetpoint;
    double input, output;
    int moveState = 0;                                       //0 = balance; 1 = back; 2 = forth
    double Kp = 30;                                          // First adjustment  [20,100]  60
    double Kd = 0.6;                                         // Second adjustment [0.0-1.0]  0.8
    double Ki = 0.3;                                         // Third adjustment  [0.0-1.0]  0.5
    
    PID pid(&input, &output, &setpoint, Kp, Ki, Kd, DIRECT); 

    //%
    void PID_Init(){
        pid.SetSampleTime(10);
        pid.SetOutputLimits(-255, 255);
    }

    //%
    void SetMode(int mode){
        pid.SetMode(mode);   
    }
    //%
    int  GetMode(){
        return pid.GetMode();
    }
    //%
    void Compute(){
        pid.Compute();  
    }
    //%
    int GetTestData(){
        return pid.GetTestData();
    }

    //%
    void SetInput(int t_input){
        input = t_input;    
    }

    //%
    int GetOutput(){
        return output;   
    }

}   



