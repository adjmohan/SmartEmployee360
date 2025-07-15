import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';
import Icon from '../AppIcon';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, userProfile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // Show preview mode for non-authenticated users
  const showPreview = !loading && !user;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Icon name="Users" size={32} className="text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">SmartEmployee360</span>
          </Link>

          {/* Preview Mode Banner */}
          {showPreview && (
            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-md">
              <Icon name="Eye" size={16} className="text-yellow-600 mr-1" />
              <span className="text-sm text-yellow-800">Preview Mode</span>
            </div>
          )}

          {/* Navigation & Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Icon name="Bell" size={20} />
            </button>

            {/* Search */}
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Icon name="Search" size={20} />
            </button>

            {/* User Profile or Auth Buttons */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="hidden md:block">
                    <div className="text-sm font-medium text-gray-900">
                      {userProfile?.full_name || user?.email || 'User'}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {userProfile?.role || 'Employee'}
                    </div>
                  </div>
                  <Icon name="ChevronDown" size={16} className="text-gray-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <div className="text-sm font-medium text-gray-900">
                        {userProfile?.full_name || user?.email}
                      </div>
                      <div className="text-xs text-gray-500">
                        {user?.email}
                      </div>
                    </div>
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Icon name="User" size={16} className="inline mr-2" />
                      Profile
                    </button>
                    <button
                      onClick={() => setIsProfileOpen(false)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Icon name="Settings" size={16} className="inline mr-2" />
                      Settings
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Icon name="LogOut" size={16} className="inline mr-2" />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;