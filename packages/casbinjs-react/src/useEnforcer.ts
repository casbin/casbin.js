import { useContext } from 'react';
import { Context } from './injectCasbin';
const useEnforcer = () => {
    return useContext(Context);
};

export default useEnforcer;
