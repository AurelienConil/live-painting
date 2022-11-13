//
//  input.hpp
//  ofLightPaintApp
//
//  Created by Admin Mac on 18/12/2019.
//

#ifndef input_hpp
#define input_hpp

#include <stdio.h>
//#include "ofxBlackMagic.h"
#include "ofMain.h"
#include "ofxGui.h"
#include "ofxOscParameterSync.h"


// Define INPUT Width and Height
#define INPUT_WIDTH 1920
#define INPUT_HEIGHT 1080
#define INPUT_FRAMERATE 30

/*
 
 Conclusion, on peut bien déssiner un shader, à l'intérieur d'un fbo.
 Puis venir donner le pointeur de se fbo.
 
 
*/

class Input
{
    
public:
    
    Input();
    Input( ofParameterGroup* pg, int w, int h);
    void setup();
    void update();
    
    //INPUT VIDEO CHOICE
    bool isUpdatingRight;
    uint64_t lastTimeNewFrame;
    uint64_t lastTimeAppFrame;

    //Camera Grabber ( webcam )
    ofVideoGrabber videoGrabber;
    ofParameter<int> videoGrabberIndex;
    void videoGrabberInit(int &newIndex);
    
    int w;
    int h;
    ofFbo fbo;
    ofFbo fboTresh;
    //ofFbo fboBlur1;
    //ofFbo fboBlur2;
    ofParameterGroup* pg;
    ofParameter<int> skipStep;
    ofParameter<float> gain; 
    ofParameter<float> threshold; 
    ofParameter<float> smooth;
    ofParameter<float> transparency;
    ofParameter<float> blur;
    ofParameter<bool> isShown;
	ofParameter<bool> symetrieV;
	ofParameter<bool> symetrieH;
    ofShader shaderTreshHsv;
    //ofShader shaderBlurX;
    //ofShader shaderBlurY;
    string name;
    
    
};
    


/*
 
 ofxBlackMagic cam;
 cam.setup(1920, 1080, 30);
 cam.drawColor();
 
 */


#endif /* input_hpp */
