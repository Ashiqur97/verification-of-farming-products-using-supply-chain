import { useState, useEffect } from 'react';
import { getUserAllRoles, getCurrentAccount } from '../utils/ethersConfig';
import { ROLE_NAMES, TEST_ADDRESSES } from '../utils/constants';

export const useRoleCheck = () => {
  const [userRoles, setUserRoles] = useState({});
  const [currentRole, setCurrentRole] = useState('DEFAULT');
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshRoles = async () => {
    setLoading(true);
    try {
      const address = getCurrentAccount();
      setUserAddress(address);
      
      console.log('🔄 Refreshing roles for address:', address);
      
      const roles = await getUserAllRoles();
      setUserRoles(roles);
      
      // Determine primary role with priority
      let primaryRole = 'DEFAULT';
      
      if (roles.FARMER) primaryRole = 'FARMER_ROLE';
      else if (roles.DISTRIBUTOR) primaryRole = 'DISTRIBUTOR_ROLE';
      else if (roles.RETAILER) primaryRole = 'RETAILER_ROLE';
      else if (roles.CONSUMER) primaryRole = 'CONSUMER_ROLE';
      
      setCurrentRole(primaryRole);
      
      console.log('✅ User roles detected:', {
        address,
        roles,
        primaryRole: ROLE_NAMES[primaryRole]
      });
      
    } catch (error) {
      console.error('❌ Error refreshing roles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh when account changes
  useEffect(() => {
    const checkAccountChange = () => {
      const currentAccount = getCurrentAccount();
      if (currentAccount && currentAccount !== userAddress) {
        console.log('🔄 Account changed, refreshing roles...');
        refreshRoles();
      }
    };

    // Check every second for account changes
    const interval = setInterval(checkAccountChange, 1000);
    
    return () => clearInterval(interval);
  }, [userAddress]);

  const hasRole = (role) => userRoles[role] || false;

  // Role-based permissions
  const permissions = {
    canCreateBatch: hasRole('FARMER'),
    canManageLogistics: hasRole('FARMER'),
    canProcessBatch: hasRole('DISTRIBUTOR'),
    canPackageBatch: hasRole('DISTRIBUTOR'),
    canUpdateRetail: hasRole('RETAILER'),
    canSell: hasRole('RETAILER'),
    canView: true // Everyone can view
  };

  return {
    userRoles,
    currentRole: ROLE_NAMES[currentRole],
    userAddress,
    loading,
    refreshRoles,
    hasRole,
    ...permissions
  };
};