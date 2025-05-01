export const formatPhoneNumber = (phone) => {
    if (!phone) return '';
    
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return `+1 (${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
    }
    
    if (cleaned.length > 2) {
      const countryCode = cleaned.substring(0, cleaned.length - 10);
      const rest = cleaned.substring(countryCode.length);
      
      if (rest.length === 10) {
        return `+${countryCode} (${rest.substring(0, 3)}) ${rest.substring(3, 6)}-${rest.substring(6)}`;
      }
      
      return `+${cleaned}`;
    }
    
    return phone;
  };