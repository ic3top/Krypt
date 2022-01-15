export const shortenAddress = (address = '') => {
  if (Array.isArray(address)) {
    return address[0] ? `${address[0].slice(0, 5)}...${address[0].slice(address.length - 4)}` : null
  }
  return address ? `${address.slice(0, 5)}...${address.slice(address.length - 4)}` : null;
}
