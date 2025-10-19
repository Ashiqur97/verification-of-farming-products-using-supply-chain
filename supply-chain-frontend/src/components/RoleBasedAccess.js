import React from 'react';
import { useRoleCheck } from '../hooks/useRoleChecks';
import { ROLE_NAMES } from '../utils/constants';

const RoleBasedAccess = ({children,requiredRole,fallback = null})  => {
    const {hasRole,loading} = useRoleCheck();

    if(loading) {
        return (
            <div className='flex items-center justify-center p-8'>
                <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500'></div>
            </div>  
        )
    }

    if(!hasRole(requiredRole)) {
        return fallback || (
            <div className='text-center p-8 glass rounded-2xl'>
                <div className='text-6xl mb-4'>Lock</div>
                <h3 className='text-xl font-bold text-white mb-2'>Access Restricted</h3>
                <p className='text-gray-300'>
                This action requires <span className="text-primary-400 font-semibold">{ROLE_NAMES[`${requiredRole}_ROLE`]}</span> role.
                </p>
            </div>
        )
    }

    return children;
}

export default RoleBasedAccess;