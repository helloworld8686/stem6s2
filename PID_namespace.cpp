#include "pxt.h"
#include "PID_v1.h"

using namespace pxt;

namespace PID_Namespace {
    double originalSetpoint = 0;
    double setpoint = originalSetpoint;
    double input, output;
    int moveState = 0;                                       //0 = balance; 1 = back; 2 = forth
    double Kp = 30;                                          // First adjustment  [20,100]  60
    double Kd = 0.6;                                         // Second adjustment [0.0-1.0]  0.8
    double Ki = 0.3;                                         // Third adjustment  [0.0-1.0]  0.5
    
    PID pid(&input, &output, &setpoint, Kp, Ki, Kd, DIRECT); 

    //%
    void Compute(){
        pid.Compute();  
    }


}   



