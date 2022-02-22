/** 
 * @file yfrobot
 * @brief YFROBOT's sensors Mind+ library.
 * @n This is a MindPlus graphics programming extension for YFROBOT's module.
 * 
 * @copyright    YFROBOT,2022
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](yfrobot@qq.com)
 * @date  2022-02-22
*/

enum IDMDIGITAL {
    //% blockId="DIM_MAGNETIC_SENSOR" block="MAGNETIC_SENSOR"
    MAGNETIC_SENSOR,
    //% blockId="DIM_TILT_SENSOR" block="TILT_SENSOR"
    TILT_SENSOR,
    //% blockId="DIM_INFRARED_PROXIMITY_SENSOR" block="INFRARED_PROXIMITY_SENSOR"
    INFRARED_PROXIMITY_SENSOR,
    //% blockId="DIM_VIBRATION_SENSOR" block="VIBRATION_SENSOR"
    VIBRATION_SENSOR,
    //% blockId="DIM_PYROELECTRIC_SENSOR" block="PYROELECTRIC_SENSOR"
    PYROELECTRIC_SENSOR,
    //% blockId="DIM_TOUCH_SENSOR" block="TOUCH_SENSOR"
    TOUCH_SENSOR,
    //% blockId="DIM_BUTTON" block="BUTTON"
    BUTTON,
    //% blockId="DIM_COLLISION_SWITCH" block="COLLISION_SWITCH"
    COLLISION_SWITCH,
    //% blockId="DIM_PATROL_LEFT" block="PATROL_LEFT"
    PATROL_LEFT,
    //% blockId="DIM_PATROL_RIGHT" block="PATROL_RIGHT"
    PATROL_RIGHT,
    //% blockId="DIM_PATROL_LEFT" block="ROTARY_A"
    ROTARY_A,
    //% blockId="DIM_PATROL_RIGHT" block="ROTARY_B"
    ROTARY_B,
}

enum IAMANALOG {
    //% blockId="AIM_LIGHT" block="LIGHT"
    LIGHT,
    //% blockId="AIM_SOUND" block="SOUND"
    SOUND,
    //% blockId="AIM_POTENTIOMETER" block="POTENTIOMETER"
    POTENTIOMETER,
    //% blockId="AIM_SOIL_HUMIDITY" block="SOIL_HUMIDITY"
    SOIL_HUMIDITY,
    //% blockId="AIM_ROCKER_X" block="ROCKER_X"
    ROCKER_X,
    //% blockId="AIM_ROCKER_Y" block="ROCKER_Y"
    ROCKER_Y,
}

enum DHT {
    //% blockId="DHT_11" block="DHT11"
    11,
    //% blockId="DHT_22" block="DHT22"
    22,
}

enum DHT_TH {
    //% blockId="DHT_T" block="temperature(℃)"
    Temperature,
    //% blockId="DHT_H" block="humidity(%rh)"
    Humidity,
}

enum SRUNIT {
    //% blockId="SRUNIT_CM" block="cm"
    CM,
    //% blockId="SRUNIT_IN" block="inch"
    IN,
}

//% color="#ff6f0c" iconWidth=50 iconHeight=40
namespace inputModule {

    //% block="read [INPUTMODULEDIGITAL] on [IDMPIN]" blockType="boolean"
    //% INPUTMODULEDIGITAL.shadow="dropdown" INPUTMODULEDIGITAL.options="IDMDIGITAL" INPUTMODULEDIGITAL.defl="IDMDIGITAL.MAGNETIC_SENSOR"
    //% IDMPIN.shadow="dropdown" IDMPIN.options="PIN_DigitalRead"
    export function inputDigitalModule(parameter: any, block: any) {
        let inputModule = parameter.INPUTMODULEDIGITAL.code;
        let inputModulePin = parameter.IDMPIN.code;
        Generator.addCode(`digitalRead(${inputModulePin});`);
    }

    //% block="read [INPUTMODULEANALOG] on [IAMPIN]" blockType="reporter"
    //% INPUTMODULEANALOG.shadow="dropdown" INPUTMODULEANALOG.options="IAMANALOG" INPUTMODULEANALOG.defl="IAMANALOG.LIGHT"
    //% IAMPIN.shadow="dropdown" IAMPIN.options="PIN_AnalogRead"
    export function inputAnalogModule(parameter: any, block: any) {
        let inputModule = parameter.INPUTMODULEANALOG.code;
        let inputModulePin = parameter.IAMPIN.code;
        Generator.addCode(`analogRead(${inputModulePin});`);
    }

    //% block="read temperature on [IAMPIN] (LM35-℃)" blockType="reporter"
    //% INPUTMODULEANALOG.shadow="dropdown" INPUTMODULEANALOG.options="IAMANALOG" INPUTMODULEANALOG.defl="IAMANALOG.LIGHT"
    //% IAMPIN.shadow="dropdown" IAMPIN.options="PIN_AnalogRead"
    export function readTemperatureSensor(parameter: any, block: any) {
        let inputModulePin = parameter.IAMPIN.code;
        Generator.addInclude("include_DFRobot_Libraries", `#include <DFRobot_Libraries.h>`);
        Generator.addObject("object_DFRobot_LM35", `DFRobot_LM35`, `LM35_${inputModulePin};`);
        Generator.addCode(`LM35_${inputModulePin}.getTemperature(${inputModulePin})`);
    }

    //% block="read T&H on [IAMPIN] [DHTMODULE] [TH]" blockType="reporter"
    //% IAMPIN.shadow="dropdown" IAMPIN.options="PIN_DigitalRead"
    //% DHTMODULE.shadow="dropdown" DHTMODULE.options="DHT" DHTMODULE.defl="DHT.11"
    //% TH.shadow="dropdown" TH.options="DHT_TH" TH.defl="DHT_TH.Temperature"
    export function readdhtSensor(parameter: any, block: any) {
        let inputModulePin = parameter.IAMPIN.code;
        let dht = parameter.DHTMODULE.code;
        let dht_th = parameter.TH.code;
        Generator.addInclude("include_DFRobot_DHT", `#include <DFRobot_DHT.h>`);
        Generator.addObject("object_DFRobot_DHT", `DFRobot_DHT`, `dht${dht}_${inputModulePin};`);
        Generator.addSetup(`initSetup_DFRobot_DHT`, `dht${dht}_${inputModulePin}.begin(${inputModulePin},DHT${dht});`);
        Generator.addCode(`dht${dht}_${inputModulePin}.get${dht_th}()`);
    }

    //% block="read ulrasonic sensor Unit [UNIT] trig[TRIGPIN] echo[ECHOPIN]" blockType="reporter"
    //% UNIT.shadow="dropdown" UNIT.options="SRUNIT" UNIT.defl="SRUNIT.CM"
    //% TRIGPIN.shadow="dropdown" TRIGPIN.options="PIN_DigitalRead"
    //% ECHOPIN.shadow="dropdown" ECHOPIN.options="PIN_DigitalRead"
    export function readUlrasonicSensor(parameter: any, block: any) {
        let unit = parameter.UNIT.code;
        let trigpin = parameter.TRIGPIN.code;
        let echopin = parameter.ECHOPIN.code;
        Generator.addInclude("include_DFRobot_URM10", `#include <DFRobot_URM10.h>`);
        Generator.addObject("object_DFRobot_URM10", `DFRobot_URM10`, `sr04;`);
        Generator.addCode(`sr04.getDistance${unit}(${trigpin},${echopin})`);
    }
}
