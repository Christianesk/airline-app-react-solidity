import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import AirlineContract from '../contracts/Airline.json';
import { AbiItem } from 'web3-utils/types';
import { environments } from "../environments/environments";


export interface IAppState {
    account: string;
    balance: string;
    flights: IFlight[];
    buyFlight: (flightIndex: Number, value: string) => Promise<any>;
    customerFlights: IFlight[];
}

export interface IFlight {
    name: string,
    price: string
}

export const useAppState = (): IAppState => {

    const web3: Web3 = new Web3(Web3.givenProvider);
    const [account, setAccount] = useState<string>("");
    const [contract, setContract] = useState<Contract | null>(null);
    const [balance, setBalance] = useState<string>("0");
    const [flights, setFlights] = useState<IFlight[]>([]);
    const [customerFlights, setCustomerFlights] = useState<IFlight[]>([]);

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
        connectToWeb3(accounts);
    });

    useEffect(() => {
        connectToWeb3();
    }, []);

    useEffect(() => {
        if (account !== "") {
            getContract();
        }
    }, [account]);

    useEffect(() => {
        if (account !== "" && !!contract) {
            getBalance();
            getTotalFlights();
            getCustommerFlights();
        }
    }, [contract]);

    const connectToWeb3 = async (selectedAccount?: string[]): Promise<void> => {

        const accounts: string[] = selectedAccount ? selectedAccount : await web3.eth.getAccounts();
        if (accounts[0] === undefined) return;

        setAccount(accounts[0].toLowerCase());
    };

    const getContract = (): void => {
        let airlineContract: Contract;
        airlineContract = new web3.eth.Contract(AirlineContract.abi as AbiItem[], environments.contractAddress);
        setContract(airlineContract);
    }

    const getBalance = async (): Promise<void> => {
        let weiBalance: string;
        weiBalance = await web3.eth.getBalance(account);
        setBalance(converterToEther(weiBalance));
    };

    const converterToEther = (weiBalance: string): string => {
        return web3.utils.fromWei(weiBalance, 'ether');
    };

    const getTotalFlights = async (): Promise<void> => {
        let totalFlights: number = 0;
        let flights: IFlight[] = [];

        totalFlights = await contract?.methods.totalFlights().call();
        for (let i = 0; i < totalFlights; i++) {
            let flight = await contract?.methods.flights(i).call();
            flights.push(flight);
            setFlights(mapFlights(flights));
        }
    };

    const mapFlights = (flights: IFlight[]): IFlight[] => {
        return flights.map((flight: IFlight) => ({
            name: flight.name,
            price: converterToEther(flight.price.toString())
        }));
    };

    const buyFlight = async (flightIndex: Number, value: string) => {
        const buy = await contract?.methods.buyFlight(flightIndex).send({ from: account, value: web3.utils.toWei(value) });
        getCustommerFlights();

        return buy;
    };

    const getCustommerFlights = async (): Promise<void> => {
        let customerTotalFlights: number = 0;
        let flights: IFlight[] = [];

        setCustomerFlights([]);
        customerTotalFlights = await contract?.methods.customerTotalFlights(account).call();

        for (let i = 0; i < customerTotalFlights; i++) {
            let flight = await contract?.methods.customerFlights(account, i).call();
            flights.push(flight);
            setCustomerFlights(mapFlights(flights))
        }
    };

    return {
        account,
        balance,
        flights,
        buyFlight,
        customerFlights
    };
};