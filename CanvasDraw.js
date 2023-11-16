import React, { useRef, useEffect } from 'react';
import './CanvasDraw.css';

const CanvasDraw = () => {
  const canvasRef = useRef();
  let drawing = false;
  let drawingColor = "black";

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    canvas.addEventListener("mousedown", () => {
      drawing = true;
    });

    canvas.addEventListener("mouseup", () => {
      drawing = false;
      context.beginPath();
    });

    canvas.addEventListener("mousemove", draw);

    const colorButtons = document.querySelectorAll(".color-button");
    colorButtons.forEach((button) => {
      button.addEventListener("click", () => {
        drawingColor = button.getAttribute("data-color");
      });
    });

    function draw(event) {
      if (!drawing) return;

      context.globalCompositeOperation = "source-over";

      context.lineWidth = 2;
      context.lineCap = "round";
      context.strokeStyle = drawingColor;

      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;

      context.lineTo(x, y);
      context.stroke();
      context.beginPath();
      context.moveTo(x, y);
    }

    function erase(event) {
      drawingColor = "white";
      drawing = true;

      canvas.addEventListener("mousemove", customErase);
      canvas.addEventListener("mouseup", () => {
        drawing = false;
        context.beginPath();
        canvas.removeEventListener("mousemove", customErase);
      });
    }

    function customErase(event) {
      if (!drawing) return;

      const x = event.clientX - canvas.getBoundingClientRect().left;
      const y = event.clientY - canvas.getBoundingClientRect().top;
      const eraserSize = 20;

      context.clearRect(x - eraserSize / 2, y - eraserSize / 2, eraserSize, eraserSize);
    }

    const eraserButton = document.getElementById("eraser-button");
    eraserButton.addEventListener("click", erase);

    function resizeCanvas() {
      canvas.width = window.innerWidth * 0.8;
      canvas.height = window.innerHeight * 0.8;
    }

    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousedown", () => {
        drawing = true;
      });
      canvas.removeEventListener("mouseup", () => {
        drawing = false;
        context.beginPath();
      });
      canvas.removeEventListener("mousemove", draw);
      colorButtons.forEach((button) => {
        button.removeEventListener("click", () => {
          drawingColor = button.getAttribute("data-color");
        });
      });
      eraserButton.removeEventListener("click", erase);
    };
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Drawer</h1>
      </div>

      <div className="canvas-container">
        <canvas id="drawing-canvas" ref={canvasRef}></canvas>
      </div>

      <div className="color-buttons">
        <button data-color="black" className="color-button" style={{ backgroundColor: 'black' }}></button>
        <button data-color="red" className="color-button" style={{ backgroundColor: 'red' }}></button>
        <button data-color="blue" className="color-button" style={{ backgroundColor: 'blue' }}></button>
        <button data-color="green" className="color-button" style={{ backgroundColor: 'green' }}></button>
        <button data-color="orange" className="color-button" style={{ backgroundColor: 'orange' }}></button>
        <button data-color="pink" className="color-button" style={{ backgroundColor: 'pink' }}></button>
        <button data-color="purple" className="color-button" style={{ backgroundColor: 'purple' }}></button>
        <button className="eraser-button" id="eraser-button">
          Eraser
        </button>
      </div>
    </div>
  );
};

export default CanvasDraw;
