import { useState, useEffect } from 'react';

const useIsVisible = (
   ref: any,
   onlyOnce: boolean,
   rootMargin: string = '0px'
) => {
   const [isVisible, setIsVisible] = useState<boolean>(false);

   useEffect(() => {
      const observer = new IntersectionObserver(
         ([entry]) => {
            if (onlyOnce && entry.isIntersecting)
               observer.unobserve(ref.current);
            setIsVisible(entry.isIntersecting);
         },
         { rootMargin }
      );

      if (ref.current) observer.observe(ref.current);
      return () => observer.unobserve(ref.current);
   }, []);

   return isVisible;
};

export default useIsVisible;
