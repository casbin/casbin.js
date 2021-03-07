import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';
import { Enforcer } from './enforcer/simpleEnforcer';

export const Context = React.createContext<Enforcer>(null as any);
export const { Consumer, Provider } = Context;
function getDisplayName(Component: React.ComponentType<any>): string {
    return Component.displayName || Component.name || 'Component';
}

export function injectCasbin(WrappedComponent: React.ComponentType<any>) {
    const RenderComponents: React.FC = (props) => (
        <Consumer>
            {(enforcer): React.ReactNode => {
                return <WrappedComponent {...props} enforcer={enforcer} />;
            }}
        </Consumer>
    );
    RenderComponents.displayName = `Casbin${getDisplayName(WrappedComponent)}`;

    return hoistNonReactStatics(RenderComponents, WrappedComponent);
}
