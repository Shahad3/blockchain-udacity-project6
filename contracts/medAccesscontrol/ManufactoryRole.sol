pragma solidity >=0.4.21 <0.6.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ManufactoryRole' to manage this role - add, remove, check
contract ManufactoryRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event ManufactoryAdded(address indexed account);
  event ManufactoryRemoved(address indexed account);

  // Define a struct 'Manufactory' by inheriting from 'Roles' library, struct Role
  Roles.Role private Manufacturers;

  // In the constructor make the address that deploys this contract the 1st Manufactory
  constructor() public {
    _addManufactory(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyManufactory() {
    require(isManufactory(msg.sender));
    _;
  }

  // Define a function 'isManufactory' to check this role
  function isManufactory(address account) public view returns (bool) {
    return Manufacturers.has(account);
  }

  // Define a function 'addManufactory' that adds this role
  function addManufactory(address account) public onlyManufactory {
    _addManufactory(account);
  }

  // Define a function 'renounceManufactory' to renounce this role
  function renounceManufactoryr() public {
    _removeManufactory(msg.sender);
  }

  // Define an internal function '_addManufactory' to add this role, called by 'addManufactory'
  function _addManufactory(address account) internal {
    Manufacturers.add(account);
    emit ManufactoryAdded(account);
  }

  // Define an internal function '_removeManufactoryr' to remove this role, called by 'removeManufactory'
  function _removeManufactory(address account) internal {
    Manufacturers.remove(account);
    emit ManufactoryRemoved(account);
  }
}