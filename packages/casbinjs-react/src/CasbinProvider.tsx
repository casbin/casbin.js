import { Enforcer } from './enforcer/simpleEnforcer';
import React from 'react';
import { Provider } from './injectCasbin';

interface Iprops{
    enforcer: Enforcer
    sub: string
}

export default class CasbinProvider extends React.PureComponent<Iprops> {
    static displayName = 'CasbinProvider';
    
    render() {
        this.props.enforcer.sub = this.props.sub
        return <Provider value={this.props.enforcer}></Provider>;
    }
}
