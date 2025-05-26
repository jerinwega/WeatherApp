import React, { useContext } from 'react';
import { HStack, Text, Button, ButtonIcon } from '@/src/components/ui';
import { ThemeContext } from '../../../App';
import { Moon, Sun } from 'lucide-react-native';
import { WHITE_COLOR, BLACK_COLOR } from '../../utils/constants';

const Header = () => {
  const { colorMode, toggleColorMode } = useContext(ThemeContext);

  return (
      <HStack
        className="justify-between items-center px-2 py-3" space="md"
      >
        <Text numberOfLines={1} size="2xl" italic className="flex-1 text-blue-600 font-black">
          NET WORLD SPORTS
        </Text>

        <Button
          variant="link"
          onPress={toggleColorMode}
          className={`p-3 rounded-full ${colorMode === 'dark' ? 'bg-white' : 'bg-black'}`}
        >
          <ButtonIcon
            as={colorMode === 'light' ? Moon : Sun}
            size='xl'
            color={colorMode === "light" ? WHITE_COLOR : BLACK_COLOR}
          />
        </Button>
      </HStack>
  );
};

export default Header;
