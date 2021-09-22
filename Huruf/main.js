  
function main() {
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('webgl');

    //definisikan vertex-vertex
    /**
     * A (0.0, 0.5), B (0.5, -0.5), C (-0.5, -0.5)
     */
    
    var vertices = [ 
        // //huruf B 
        // -0.5, -0.5,
        // -0.5, 0.8,
        // -0.5, 0.9,
        // -0.1, 0.9,
        // -0.1, 0.5,
        // -0.1, 0.3,
        // -0.1, 0.3,
        // -0.5, 0.2,
        // -0.4, 0.2,
        // -0.1, 0.2,
        // -0.1, 0.2,
        // 0.0, -0.5
        -0.2, 0.3,  //titik A
        0.1, 0.3,   //titik B
        0.1, 0.2,   //titik C
        -0.1, 0.2,  //titik D
        -0.1, 0.1,  //titik E
        0.07, 0.1,  //titik F
        0.07, 0.0,  //titik G
        -0.1, 0.0,  //titik H
        -0.1, -0.1, //titik I
        -0.1, -0.1, //titik J
        -0.1, -0.2, //titik K
        -0.2, -0.2, //titik L
    ];

    var positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec2 a_Position;
        void main() {
            gl_Position = vec4(a_Position, 0.0, 1.0);
            gl_PointSize = 20.0;
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderCode);
    gl.compileShader(vertexShader);

    // Fragment definition

    var fragmentShaderCode = `
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
        }
    `;

    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderCode);
    gl.compileShader(fragmentShader);

    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(1.0, 1.0, 1.0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.LINE_LOOP, 0, 12);
}