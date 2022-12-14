#version 120

uniform sampler2DRect tex0;

uniform float brightness_to_add;
uniform float threshold;
uniform float threshold_smooth;
uniform float transparency_smooth;

varying vec2 texCoordVarying;

vec3 hsv2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rgb2hsv(vec3 c) {
     float cMax=max(max(c.r,c.g),c.b),
     cMin=min(min(c.r,c.g),c.b),
     delta=cMax-cMin;
     vec3 hsv=vec3(0.,0.,cMax);
     if(cMax>cMin){
         hsv.y=delta/cMax;
         if(c.r==cMax){
            hsv.x=(c.g-c.b)/delta;
         }else if(c.g==cMax){
            hsv.x=2.+(c.b-c.r)/delta;
         }else{
            hsv.x=4.+(c.r-c.g)/delta;
         }
         hsv.x=fract(hsv.x/6.);
     }
     return hsv;
 }

void main()
{
    // gl_FragCoord contains the window relative coordinate for the fragment.
    // we use gl_FragCoord.x position to control the red color value.
    // we use gl_FragCoord.y position to control the green color value.
    // please note that all r, g, b, a values are between 0 and 1.

    vec4 color;
    vec4 outputColor;
    color =  texture2DRect(tex0, texCoordVarying );
    vec3 hsvColor = rgb2hsv(vec3(color.r, color.g, color.b));
    //vec3 rgbColor = hsv2rgb(hsvColor);
    hsvColor = vec3(hsvColor.r , hsvColor.g , min(1 , (max(0, hsvColor.b + brightness_to_add)))  );
    
    float transparent_value;
    
    
    // This is transparent threshold
    
    if (hsvColor.b >= (threshold* transparency_smooth )  )
    {
     transparent_value = 1;
    }
   else
   {
       float alphaValue = (hsvColor.b  / ( threshold * transparency_smooth));
       transparent_value = alphaValue;

    }

     

     
     
    // This is black threshold
    if (hsvColor.b >= (threshold ) ){

    }
    else if (hsvColor.b >= (threshold* threshold_smooth ))
    {
        float brightnessValue = (hsvColor.b - threshold*threshold_smooth ) / ( threshold * ( 1.0 - threshold_smooth));
        hsvColor.b = hsvColor.b* brightnessValue;

        
    }
    else{
        hsvColor.b = 0;
    }
    
    vec3 rgbColor = hsv2rgb(vec3(hsvColor.r, hsvColor.g, hsvColor.b));
    outputColor = vec4(rgbColor.r, rgbColor.g, rgbColor.b, transparent_value);
    

    
    //outputColor = vec4(rgbColor.r, 0, 0, 1);


    gl_FragColor = outputColor;


}

/*

 
 
 //HSV (hue, saturation, value) to RGB.
 //Sources: https://gist.github.com/yiwenl/745bfea7f04c456e0101, https://gist.github.com/sugi-cho/6a01cae436acddd72bdf
 vec3 hsv2rgb(vec3 c){
 vec4 K=vec4(1.,2./3.,1./3.,3.);
 return c.z*mix(K.xxx,saturate(abs(fract(c.x+K.xyz)*6.-K.w)-K.x),c.y);
 }
 
 //RGB to HSV.
 //Source: https://gist.github.com/yiwenl/745bfea7f04c456e0101
 vec3 rgb2hsv(vec3 c) {
 float cMax=max(max(c.r,c.g),c.b),
 cMin=min(min(c.r,c.g),c.b),
 delta=cMax-cMin;
 vec3 hsv=vec3(0.,0.,cMax);
 if(cMax>cMin){
 hsv.y=delta/cMax;
 if(c.r==cMax){
 hsv.x=(c.g-c.b)/delta;
 }else if(c.g==cMax){
 hsv.x=2.+(c.b-c.r)/delta;
 }else{
 hsv.x=4.+(c.r-c.g)/delta;
 }
 hsv.x=fract(hsv.x/6.);
 }
 return hsv;
 }
 //Source: https://gist.github.com/sugi-cho/6a01cae436acddd72bdf
 vec3 rgb2hsv_2(vec3 c){
 vec4 K=vec4(0.,-1./3.,2./3.,-1.),
 p=mix(vec4(c.bg ,K.wz),vec4(c.gb,K.xy ),step(c.b,c.g)),
 q=mix(vec4(p.xyw,c.r ),vec4(c.r ,p.yzx),step(p.x,c.r));
 float d=q.x-min(q.w,q.y),
 e=1e-10;
 return vec3(abs(q.z+(q.w-q.y)/(6.*d+e)),d/(q.x+e),q.x);
 }
 

*/

