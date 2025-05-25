import React, { useContext } from 'react';
import { Box, HStack, Text, Button, ButtonIcon } from '@/src/components/ui';
import { ThemeContext } from '../../../App';
import { Moon, Sun } from 'lucide-react-native';

const Header = () => {
  const { colorMode, toggleColorMode } = useContext(ThemeContext);

  return (
    // <Box className="bg-gray-700 p-3">
      <HStack
        className="justify-between items-center px-2 py-3" space="md"
      >
        <Text size="2xl" italic className="text-blue-600 font-black">
          NET WORLD SPORTS
        </Text>

        <Button
          variant="link"
          onPress={toggleColorMode}
          className={`p-3 rounded-full ${colorMode === 'dark' ? 'bg-[#262626]' : 'bg-blue-600'}`}
        >
          <ButtonIcon
            as={colorMode === 'light' ? Moon : Sun}
            size='xl'
            color={colorMode === "light" ?  "#000000" : "#FFFFFF"}
          />
        </Button>
      </HStack>
      // </Box>
  );
};

export default Header;
