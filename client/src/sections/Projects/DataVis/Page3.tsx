import css from './DataVis.module.css';

const Page = () => (
   <div className={css.contentContainer}>
      <h1>Using the App - Camera Controls</h1>

      <p>
         The camera is rotated by clicking on the viewport and dragging. Note
         all rotation is about the y-axis. Scrolling will zoom in/out.
      </p>

      <div className={css.contentContainer__flexSection}>
         <div>
            <h2>Camera Options</h2>
            <p>
               There are currently two camera options: <b>Compare mode</b> and{' '}
               <b>Link mode</b>. These are available in the main display section
               and are pictured to the right.
            </p>
         </div>
         <div>
            <img
               alt="camera options"
               src={require('assets/img/split_camera_1.webp')}
            />
         </div>
      </div>

      <div className={css.contentContainer__flexSection}>
         <div>
            <h2>Compare Mode</h2>
            <p>
               Compare mode enables a second viewport which allows the user to
               view the same dataset with different items visible. Item
               visibility per-viewport is handled in the item controller.
            </p>
            <p>
               In the example to the right, <b>compare mode</b> has been enabled
               and a second viewport is visible. Each displays a planar slice.
            </p>
         </div>
         <div>
            <img
               alt="compare mode"
               src={require('assets/img/split_camera_2.webp')}
            />
         </div>
      </div>

      <div className={css.contentContainer__flexSection}>
         <div>
            <h2>Link Mode</h2>
            <p>
               Link mode enables and disables viewport camera linking. When
               enabled, each viewport will have the same zoom and viewing angle.
               When disabled, the user may interact with the two viewports
               separately.
            </p>
            <p>
               In the example to the right, <b>link mode</b> has been disabled
               and the second viewport has been rotated.
            </p>
         </div>
         <div>
            <img
               alt="link mode"
               src={require('assets/img/split_camera_3.webp')}
            />
         </div>
      </div>
   </div>
);

export default Page;
