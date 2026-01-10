import React, { useState, useRef } from 'react';
import { useFloating, useInteractions, useClick, useRole, useDismiss, FloatingFocusManager, useListNavigation, useTypeahead, offset, flip, size } from '@floating-ui/react';
import { Check, ChevronDown, X } from 'lucide-react';
import { clsx } from 'clsx';

interface Option {
  value: string;
  label: string;
  count?: number;
  avatar?: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  showAvatars?: boolean;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = 'Select options...',
  icon,
  className,
  showAvatars = false
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const allowSelectRef = useRef(false);
  const selectedValues = new Set(value);

  const { refs, floatingStyles, context } = useFloating({
    placement: 'bottom-start',
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(4),
      flip(),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
            maxHeight: '300px'
          });
        }
      })
    ]
  });

  const click = useClick(context, { 
    event: 'mousedown',
    toggle: true,
    ignoreMouse: false
  });
  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context);
  const listNav = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop: true
  });
  const typeahead = useTypeahead(context, {
    listRef,
    activeIndex,
    onMatch: setActiveIndex,
    resetMs: 1000
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    role,
    dismiss,
    listNav,
    typeahead
  ]);

  const handleSelect = (optionValue: string) => {
    const newValue = selectedValues.has(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  const selectedOptions = value
    .map(v => options.find(opt => opt.value === v))
    .filter(Boolean);

  return (
    <div className={clsx('relative', className)}>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={clsx(
          'input flex items-center min-h-[38px] w-full pl-10 pr-3 py-1 rounded-md text-sm cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          'dark:bg-gray-700 dark:border-gray-600 dark:text-white'
        )}
      >
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {icon}
          </div>
        )}
        <div className="flex flex-wrap gap-1 flex-1 min-w-0">
          {selectedOptions.length > 0 ? (
            selectedOptions.map((option) => option && (
              <span
                key={option.value}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
              >
                {showAvatars && option.avatar && (
                  <img
                    src={option.avatar}
                    alt={option.label}
                    className="w-4 h-4 rounded-full mr-1"
                  />
                )}
                {option.label}
                <button
                  onClick={(e) => handleRemove(option.value, e)}
                  className="ml-1 hover:text-primary/80"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{placeholder}</span>
          )}
        </div>
        <ChevronDown className={clsx(
          'w-4 h-4 text-gray-400 transition-transform ml-2',
          isOpen && 'transform rotate-180'
        )} />
      </div>

      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg overflow-hidden overflow-y-auto"
          >
            <div className="p-1">
              {options.map((option, index) => (
                <div
                  key={option.value}
                  ref={(node) => {
                    listRef.current[index] = node;
                  }}
                  {...getItemProps({
                    onClick: () => handleSelect(option.value)
                  })}
                  className={clsx(
                    'flex items-center px-3 py-2 text-sm rounded-md cursor-pointer',
                    'hover:bg-gray-100 dark:hover:bg-gray-700',
                    activeIndex === index && 'bg-gray-100 dark:bg-gray-700'
                  )}
                >
                  <div className={clsx(
                    'w-4 h-4 border rounded mr-2 flex items-center justify-center',
                    selectedValues.has(option.value)
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-300 dark:border-gray-500'
                  )}>
                    {selectedValues.has(option.value) && (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                  {showAvatars && option.avatar && (
                    <img
                      src={option.avatar}
                      alt={option.label}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                  )}
                  <span className="flex-1">{option.label}</span>
                  {option.count !== undefined && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({option.count})
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  );
}