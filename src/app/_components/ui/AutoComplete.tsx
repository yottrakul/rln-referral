"use client";
import {
  Box,
  Input,
  Popover,
  Portal,
  PopoverContent,
  PopoverBody,
  PopoverAnchor,
  Stack,
  InputGroup,
  InputRightElement,
  type SystemStyleObject,
} from "@chakra-ui/react";
import { type ChangeEvent, useState, useEffect } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { isUndefined } from "lodash";

export type AutoCompleteItem = {
  label: string;
  value: string;
};

interface AutoCompleteProps<T extends AutoCompleteItem> {
  items?: T[];
  onSelect: (item: T) => void;
  placeholder?: string;
  potalRef?: React.MutableRefObject<HTMLElement | null>;
}

const activeStyle: SystemStyleObject = {
  bg: "gray.100",
};

export default function AutoComplete<T extends AutoCompleteItem>({
  items,
  onSelect,
  placeholder,
  potalRef,
}: AutoCompleteProps<T>) {
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<T[]>(items ?? []);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cursor, setCursor] = useState<number>(-1);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (isUndefined(items)) return;
    if (value.length > 0) {
      const filteredSuggestions = items.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
      if (filteredSuggestions.length > 0) {
        setMenuIsOpen(true);
      } else {
        setMenuIsOpen(false);
      }
    } else {
      setSuggestions(items);
    }
  };

  const handleOnSelect = (item: T) => {
    setMenuIsOpen(false);
    onSelect(item);
    setInputValue(item.label);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (cursor < suggestions.length - 1) {
        setCursor(cursor + 1);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cursor > 0) {
        setCursor(cursor - 1);
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (suggestions[cursor]) {
        const selectedSuggestion = suggestions[cursor];
        if (selectedSuggestion) {
          handleOnSelect(selectedSuggestion);
        }
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    // reset cursor when menu is closed
    if (!menuIsOpen) {
      setCursor(-1);
    }
  }, [menuIsOpen]);

  return (
    <Popover placement="bottom-start" isOpen={menuIsOpen} autoFocus={false}>
      <PopoverAnchor>
        <InputGroup>
          <Input
            placeholder={placeholder ?? "ค้นหา..."}
            onBlur={() => setMenuIsOpen(false)}
            onClick={() => setMenuIsOpen(true)}
            type="text"
            value={inputValue}
            onChange={(e) => handleInputChange(e)}
            onKeyDown={(e) => handleKeyDown(e)}
            aria-autocomplete="list"
            aria-controls="autocomplete-list"
            aria-expanded={menuIsOpen}
            aria-haspopup="menu"
          />
          <InputRightElement>
            <SearchIcon color="gray.300" />
          </InputRightElement>
        </InputGroup>
      </PopoverAnchor>
      <Portal containerRef={potalRef}>
        <PopoverContent>
          <PopoverBody paddingInline={0}>
            <Stack id="autocomplete-list" role="menu" as={"ul"} maxH={"10rem"} overflow={"auto"} spacing={0}>
              {suggestions.map((suggestion, index) => (
                <Box
                  sx={{
                    ...(cursor === index && activeStyle),
                  }}
                  py={2}
                  px={4}
                  cursor={"pointer"}
                  key={suggestion.value}
                  role="menuitem"
                  onClick={() => handleOnSelect(suggestion)}
                  onMouseEnter={() => setCursor(index)}
                >
                  {suggestion.label}
                </Box>
              ))}
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}
