import { useState, useEffect, useRef } from 'react';
import Tex2SVG from 'react-hook-mathjax';
import { GL2Canvas } from '@/components/elements';
import GLHelper from './glhelper';
import TextureHelper from './texhelper';
import buildShader from './shader';
import css from './Emission.module.css';

// NOTE: this has been ported from pure javascript and still
//    needs to be cleaned up

// private globals
let _showLoadingBar = true; // for loadingbar quick hack
let _lastScene = null; // skip render if nothing changed

const drawScene = (gl, { sceneRef, objsRef, texRef, renderRef }) => {
   const scene = sceneRef.current;
   const objects = objsRef.current || [null];
   const texHelper = texRef.current;
   const glHelper = renderRef.current;

   _showLoadingBar = texHelper.loaded !== 1;
   if (_lastScene === scene) return;
   _lastScene = sceneRef.current;

   if (!texHelper.isInit || texHelper.glInstance !== gl) {
      _showLoadingBar = true;
      texHelper.init(gl);
   }

   if (!glHelper.isInit || glHelper.glInstance !== gl) {
      const shader = buildShader(gl);
      glHelper.init(gl, shader);
   }

   glHelper.renderScene(objects, scene, texHelper.textures);
};

const App = () => {
   const [sliderValue, setSliderValue] = useState(95);
   const [editMode, setEditMode] = useState(false);
   const [textValue, setTextValue] = useState('9.5');
   const [canvasWidth, setCanvasWidth] = useState(
      Math.min(500, window.innerWidth)
   );
   const [isLoaded, setIsLoaded] = useState(false);
   const [scene, _setScene] = useState({
      nu: 9.5,
      unHideCSM: true,
      volDim: 256,
      camera: { zoom: -1.5, azi: 0.0, pol: 0.0 },
   });

   const sceneRef = useRef(scene);
   const setScene = (data) => {
      sceneRef.current = data;
      _setScene(data);
   };

   const enableEdit = () => setEditMode(true);
   const disableEdit = () => {
      setTextValue(sliderValue / 10.0);
      setEditMode(false);
   };

   useEffect(() => {
      setCanvasWidth(Math.min(500, window.innerWidth));
   }, [window.innerWidth]);

   const updateCamera = (gl, mouseInfo) => {
      const newScene = { ...sceneRef.current };
      if (mouseInfo.deltaY) {
         newScene.camera.zoom -= mouseInfo.deltaY / 1000;
      } else if (!mouseInfo.isActive || !mouseInfo.lastMouseLocation) {
         return;
      } else {
         newScene.camera.azi -=
            mouseInfo.lastMouseLocation.x - mouseInfo.mouseLocation.x;
         newScene.camera.pol -=
            mouseInfo.lastMouseLocation.y - mouseInfo.mouseLocation.y;
      }
      setScene(newScene);
   };

   const handleChange = (event) => {
      const { value } = event.target;
      setSliderValue(value);
      const newScene = {
         ...sceneRef.current,
         nu: value / 10.0,
      };
      setScene(newScene);
   };

   const toggleCSM = () => {
      const newScene = {
         ...sceneRef.current,
         unHideCSM: !scene.unHideCSM,
      };
      setScene(newScene);
   };

   const requestValChange = (event) => {
      event.preventDefault();
      const numValue = Number(textValue);
      // test explicity for NaN using +'1' === 2; +'a' === NaN
      if (Number.isNaN(+numValue)) return;
      if (numValue < 7.0 || numValue > 12.0) return;
      setSliderValue(10 * numValue);
      const newScene = {
         ...sceneRef.current,
         nu: numValue,
      };
      setScene(newScene);
      disableEdit();
   };

   const handleInput = (event) => setTextValue(event.target.value);
   const handleFocus = (event) => event.target.select();

   const handleKeyPress = (event) => {
      if (event.keyCode === 27) disableEdit();
   };

   const valChangeArea = (
      <form onSubmit={requestValChange}>
         <input
            autoFocus
            className={css.editMode}
            onChange={handleInput}
            value={textValue}
            onKeyDown={handleKeyPress}
            onBlur={disableEdit}
            onFocus={handleFocus}
         />
      </form>
   );

   const valDisplayArea = (
      <span onDoubleClick={enableEdit}>
         <Tex2SVG display="inline" latex="\log_{10}(\nu) = " />
         {` ${sliderValue / 10.0}`}
      </span>
   );

   const valDisplay = editMode ? valChangeArea : valDisplayArea;

   // try to force load
   useEffect(() => {
      setTimeout(() => {
         const newScene = { ...sceneRef.current };
         setScene(newScene);
      }, 2000);
   }, []);

   const texHelper = new TextureHelper();
   const glHelper = new GLHelper();

   const texRef = useRef(texHelper);
   const renderRef = useRef(glHelper);
   const objsRef = useRef(null);

   // force loading bar out after data is loaded
   useEffect(() => {
      if (texRef.current.loaded) setScene({ ...sceneRef.current });
   }, [texRef.current.loaded]);

   useEffect(() => {
      if (_showLoadingBar) return setIsLoaded(false);
      return setIsLoaded(true);
   }, [_showLoadingBar]);

   return (
      <>
         <div className={css.controllContainer}>
            <input
               type="range"
               onChange={handleChange}
               min={70}
               max={120}
               value={sliderValue}
            />
            <div className={`noselect ${css.valDisplay}`}>{valDisplay}</div>
            <div className={`noselect ${css.csmButton}`} onClick={toggleCSM}>
               Toggle CSM
            </div>
         </div>
         <div className={css.canvasContainer}>
            <GL2Canvas
               draw={drawScene}
               onInteract={updateCamera}
               setStyle={{
                  width: `${canvasWidth}px`,
                  height: `${(4 / 5) * canvasWidth}px`,
               }}
               sceneRef={sceneRef}
               objsRef={objsRef}
               texRef={texRef}
               renderRef={renderRef}
            />
            <div
               className={css.loadingBar}
               style={isLoaded ? { display: 'none' } : {}}
            >
               <div>Loading...</div>
            </div>
         </div>
      </>
   );
};

export default App;
