import { useState, useContext, createContext, useMemo } from 'react';

type Enable = { id: JSX.Element | string | null };
interface ProviderInterface {
   isEnabled: Enable;
   setIsEnabled: React.Dispatch<React.SetStateAction<Enable>>;
}

const DisplayContext = createContext<ProviderInterface | null>(null);

function DisplayProvider({ children }: { children: React.ReactNode }) {
   const [isEnabled, setIsEnabled] = useState<Enable>({ id: null });
   const display = useMemo(() => ({ isEnabled, setIsEnabled }), [isEnabled]);

   return (
      <DisplayContext.Provider value={display}>
         {children}
      </DisplayContext.Provider>
   );
}

const useDisplay = () => {
   const display = useContext(DisplayContext);
   const { isEnabled, setIsEnabled } = display as ProviderInterface;

   const enableItem = (itemId: JSX.Element | string | null) =>
      setIsEnabled({ id: itemId });

   return {
      isEnabled,
      enableItem,
   };
};

export { DisplayProvider, useDisplay };
