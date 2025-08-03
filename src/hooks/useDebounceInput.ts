import { useState, useEffect, useCallback } from 'react';

export const useDebounceInput = (
  initialValue: number,
  onValueChange: (value: number) => void,
  delay: number = 500,
  isDecimal: boolean = false
) => {
  const [displayValue, setDisplayValue] = useState(initialValue.toString());
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  // Update display value when external value changes
  useEffect(() => {
    setDisplayValue(initialValue.toString());
    setDebouncedValue(initialValue);
  }, [initialValue]);

  // Debounce the value changes
  useEffect(() => {
    const timer = setTimeout(() => {
      const numericValue = parseFloat(displayValue) || 0;
      if (numericValue !== debouncedValue) {
        setDebouncedValue(numericValue);
        onValueChange(numericValue);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayValue, delay, onValueChange, debouncedValue]);

  const handleChange = useCallback((value: string) => {
    // Allow empty value
    if (value === '') {
      setDisplayValue('');
      return;
    }

    // Validate input based on type
    const regex = isDecimal ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;
    
    if (regex.test(value)) {
      setDisplayValue(value);
    }
  }, [isDecimal]);

  return {
    displayValue,
    handleChange,
    isValid: displayValue === '' || !isNaN(parseFloat(displayValue))
  };
};