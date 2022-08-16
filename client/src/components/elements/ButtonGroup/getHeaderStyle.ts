const getHeaderStyle = (width: string | undefined): React.CSSProperties => {
   if (!width) return {};
   // if it's just a number, return with pixel val (e.g. '11')
   if (!Number.isNaN(+width)) return { width: `${width}px` };
   // return everything else (e.g. '11px', '20%', '2rem')
   return { width };
};

export default getHeaderStyle;
