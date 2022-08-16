import { memo } from 'react';
import IntroContainer from './IntroContainer';
import ToolsCard from './ToolsCard';
import LanguagesCard from './LanguagesCard';
import FrameworksCard from './FrameworksCard';
import css from './About.module.css';

export const About = memo(() => (
   <div className={css.aboutContainer}>
      <IntroContainer />

      <div className={css.flexColumns}>
         <LanguagesCard />
         <FrameworksCard />
         <ToolsCard />
      </div>
   </div>
));
