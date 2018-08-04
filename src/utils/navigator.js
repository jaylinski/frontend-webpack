function isSlowConnection() {
  if (navigator.connection) {
    const networkInformation = navigator.connection;
    switch (networkInformation.effectiveType) {
      case 'slow-2g':
      case '2g':
      case '3g':
        return true;
      default:
        return false;
    }
  }
  return false;
}

export { isSlowConnection };
