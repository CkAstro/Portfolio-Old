import css from './DataVis.module.css';

const Page = () => (
   <div className={css.contentContainer}>
      <h1>Using the App - Creating Slices</h1>

      <p>
         The volumetric dataset is viewed through slices (with more features
         coming soon!)
      </p>

      <div className={css.contentContainer__flexSection}>
         <div>
            <h2>The Create Items Tool</h2>
            <p>
               The create items tool is located in the Toolbar. It is shown to
               the right and consists of 5 buttons.
            </p>
            <p>
               From left to right, clicking these buttons creates: a
               constant-value isosurface, a spherical slice, a constant-Z plane,
               a constant-Y plane, and a constant-X plane.
            </p>
         </div>
         <div>
            <img
               alt="create items"
               src={require('assets/img/create_items.webp')}
            />
         </div>
      </div>

      <div className={css.contentContainer__flexSection}>
         <div>
            <h2>The Item Controller</h2>
            <p>
               Once a slice is created, it will appear in the item controller,
               located at the bottom of the Toolbar.
            </p>
            <p>
               On the top bar is the item name, viewport visibility, and the
               delete button. Clicking the visibility options will toggle the
               display. Clicking the delete button will remove the item.
            </p>
            <p>
               Both the item name and the slider values are editable via
               double-click.
            </p>
            <p>
               The slidebars allow you to change how the item is displayed. For
               the isosurface, you can change the value (range 0 to 1). For the
               constant-value planes, you can change the axis value (range -1 to
               1). For the sphere, you can change both the radius (range 0 to 1)
               and the center ,coordinates.
            </p>
            <p>
               {' '}
               The &quot;Variable&quot; option allows you to change via
               drop-down which variable is displayed.
            </p>
         </div>
         <div>
            <img
               alt="control items"
               src={require('assets/img/control_items.webp')}
            />
         </div>
      </div>
   </div>
);

export default Page;
