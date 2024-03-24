/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React from 'react';
import { useSwitchChain } from 'wagmi';
import { getAccount } from '@wagmi/core';
import { supportedNetworks, wagmiConfig } from '@/config/rainbowkit';
import classNames from 'classnames';
import { MenuDropdown } from '..';

const SwitchNetwork = ({ setShowNetworks }: { setShowNetworks: (val: boolean) => void }) => {
  const { chainId } = getAccount(wagmiConfig);
  const { switchChain } = useSwitchChain();

  const switchNetwork = (chainId: number) => {
    switchChain({ chainId });
  };
  return (
    <MenuDropdown onClick={() => setShowNetworks(false)}>
      <div className="flex flex-col gap-7">
        {supportedNetworks.map((network, index) => (
          <div
            key={index}
            onClick={() => {
              switchNetwork(network.chainId);
              setShowNetworks(false);
            }}
            className="flex items-center gap-4 cursor-pointer">
            {network.icon}
            <div
              className={classNames('text-sm md:text-base text-black-250 font-medium', {
                'text-grey-250': chainId === network.chainId,
              })}>
              {network.name}
            </div>
          </div>
        ))}
      </div>
    </MenuDropdown>
  );
};

export default SwitchNetwork;
