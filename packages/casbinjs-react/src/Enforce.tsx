import React from 'react';
import useEnforcer from './useEnforcer';

interface IProps {
    deny: false;
    sub?: string;
    obj: string;
    act: string;
}
const Enforce: React.FC<IProps> = (props) => {
    const { deny, obj, act, children } = props;
    const enforcer = useEnforcer();

    const sub = props.sub || enforcer.sub!;
    const enforceRes = enforcer.enforce(sub, obj, act);
    const shouldRender = (enforceRes && !deny) || (!enforceRes && deny);

    return <>{shouldRender && children}</>;
};

export default Enforce;
