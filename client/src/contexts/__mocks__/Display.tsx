type Enable = { id: JSX.Element | string | null };
const isEnabled: Enable = { id: null };

const useDisplay = () => {
   const enableItem = (itemId: JSX.Element | string | null) => {
      isEnabled.id = itemId;
   };

   return {
      isEnabled,
      enableItem,
   };
};

export default { useDisplay };
export { useDisplay };
