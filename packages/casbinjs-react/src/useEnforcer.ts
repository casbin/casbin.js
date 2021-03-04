import { useContext } from 'react';
import { Context } from './injectCasbin';
const useEnforcer = () => {
    const { enforcer } = useContext(Context);
    //TODO
};

export default useEnforcer;
