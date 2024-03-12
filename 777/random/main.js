var VSHADER_SOURCE = `
attribute vec4 a_Position;
attribute vec4 a_Normal;

void main() {
  gl_Position = a_Position;
}`;


var FSHADER_SOURCE = `
#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D u_Sampler;
uniform float u_Time;
uniform vec3 iResolution;

#define N 30


vec4 square(vec2 fragCoord, vec2 where, vec2 size){
    vec2 Size = iResolution.xy*size/2.;

    where+=size/2.;
    where*=(vec2(1.,1.)-size);

	if(   abs(iResolution.x*where.x - fragCoord.x)  < Size.x 
       && abs(iResolution.y*where.y - fragCoord.y)  < Size.y){
        
        	
        	vec2 uv=fragCoord/iResolution.xy;
        	uv-=where-size/2.;
        	uv = mat2(1./size.x, 0 , 0 , 1./size.y) * uv;
			return vec4(texture2D(u_Sampler,uv).rgb, 1.0);
    	
    	}
        else{
           return vec4(0,0,0,0.0);
        }
}


void main( )

{
    float aspectratio=iResolution.x/iResolution.y;

    vec4 color = vec4(0,0,0,1.0);

    for(int i=0; i<N; i++){
        
        float basespeed=4.;
        float randomspeed=3.;
        
        float rand1=abs(sin(float(i)*43.654)); //facciamo finta che sia random
        float rand2=abs(sin(float(i)*23.44))*2.;

        vec2 speed = vec2(
            basespeed + rand1 * randomspeed + rand2,
            basespeed + rand1 * randomspeed - rand2
        ); //questa roba è un po demenziale ma era cosi nella versione precedente

        
    	float square_size=((1.-rand1)*40.+50.)/iResolution.x;


        vec2 position=abs(mod(80.*speed*u_Time/iResolution.x,vec2(2.,2.)) - vec2(1.,1.));


        vec4 tcolor=square(gl_FragCoord.xy, position, vec2(square_size,square_size*aspectratio));
        
		if(tcolor.a != 0.0)
            color=tcolor;
    }

    gl_FragColor = color;
}
`;


function main() {
    var canvas = document.getElementById('webgl');
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight; 
    
    window.addEventListener("resize", () =>{
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight; 
    }); 
    
    // Get the rendering context for WebGL
    var gl = canvas.getContext('webgl');
    if (!gl) {
        console.error('Failed to get the rendering context for WebGL');
        return;
    }
    
    // Initialize shaders
    if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.error('Failed to intialize shaders.');
        return;
    }
    
    var n = changeShape(gl);
    
    // Set texture
    if (!initTextures(gl)) {
        console.error('Failed to intialize the texture.');
        return;
    }
    
    // Set the clear color and enable the depth test
    gl.clearColor(0.0, 0.0, 0.0, 1);
    gl.enable(gl.DEPTH_TEST);
    
    // Get the storage locations of uniform variables and so on
    var Time = gl.getUniformLocation(gl.program, 'u_Time');
    var iResolution = gl.getUniformLocation(gl.program, 'iResolution');
    
    if ( !Time || !iResolution) {
        console.error('Failed to get the storage location of uniform');
        //return;
    }
    // *******************************************************************************************
    
    var timerStart = Date.now();
    
    var tick = function() {
        
        gl.uniform1f(Time,  (Date.now()-timerStart)/1000);
        gl.uniform3f(iResolution, canvas.width, canvas.height, 0.0);
        
        // Clear color and depth buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        // Draw the cube(Note that the 3rd argument is the gl.UNSIGNED_SHORT)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
        
        requestAnimationFrame(tick, canvas); // Request that the browser ?calls tick
    };
    tick();
}



function changeShape(gl) {
    var vertices = new Float32Array([
    -1, 1,   -1, -1,   1, 1,　1, -1
    ]);
    var n = 4; // The number of vertices
    
    // Create a buffer object
    var vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }
    
    // Bind the buffer object to target
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    // Write date into the buffer object
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if (a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return -1;
    }
    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
    
    // Enable the assignment to a_Position variable
    gl.enableVertexAttribArray(a_Position);
    
    return n;
}



function initArrayBuffer(gl, attribute, data, type, num) {
    // Create a buffer object
    var buffer = gl.createBuffer();
    if (!buffer) {
        console.error('Failed to create the buffer object');
        return false;
    }
    // Write date into the buffer object
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    // Assign the buffer object to the attribute variable
    var a_attribute = gl.getAttribLocation(gl.program, attribute);
    if (a_attribute < 0) {
        console.error('Failed to get the storage location of ' + attribute);
        return false;
    }
    gl.vertexAttribPointer(a_attribute, num, type, false, 0, 0);
    // Enable the assignment of the buffer object to the attribute variable
    gl.enableVertexAttribArray(a_attribute);
    
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    
    return true;
}


function initTextures(gl) {
    var texture = gl.createTexture(); // Create a texture object
    if (!texture) {
        console.log('Failed to create the texture object');
        return false;
    }
    
    // Get the storage location of u_Sampler
    var u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler');
    if (!u_Sampler) {
        console.log('Failed to create the Sampler object');
        return false;
    }
    var image = new Image(); // Create the image object
    if (!image) {
        console.log('Failed to create the image object');
        return false;
    }
    // Register the event handler to be called on loading an image
    image.onload = function() {     
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
        // Enable texture unit0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture object to the target
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        // Set the texture parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        // Set the texture image
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
        
        // Set the texture unit 0 to the sampler
        gl.uniform1i(u_Sampler, 0);
        
        gl.clear(gl.COLOR_BUFFER_BIT);
    };
    // Tell the browser to load an image
    image.src = 'sigterm.jpg?lol';
    
    return true;
}


