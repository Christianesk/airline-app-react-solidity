import React, { useEffect, useState } from 'react';
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import AirlineContract from "../contracts/Airline.json";
import { AbiItem } from 'web3-utils/types'


export interface IAppState {
    account: string;
    balance: string;
}

export const useAppState = (): IAppState => {

    const web3: Web3 = new Web3(Web3.givenProvider);
    const [account, setAccount] = useState<string>("");
    const [contract, setContract] = useState<Contract | null>(null);
    const [balance, setBalance] = useState<string>("0");

    useEffect(() => {
        connectToWeb3();
    }, []);

    useEffect(() => {
        getContract();
    }, [account])

    useEffect(() => {
        getBalance();
    }, [contract])

    const connectToWeb3 = async (): Promise<void> => {
        const accounts: string[] = await web3.eth.getAccounts();

        setAccount(accounts[0].toLowerCase());
    };

    const getContract = (): void => {
        let airlineContract: Contract;
        airlineContract = new web3.eth.Contract(AirlineContract.abi as AbiItem[], account);
        setContract(airlineContract);
    }

    const getBalance = async (): Promise<void> => {
        let weiBalance: string = await web3.eth.getBalance(account);
        setBalance(weiBalance);
    };

    return { account, balance }
};