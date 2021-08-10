import React, { useEffect, useState } from 'react';
import Web3 from "web3";
import { Contract } from 'web3-eth-contract';
import AirlineContract from "../contracts/Airline.json";
import { AbiItem } from 'web3-utils/types'


export interface IAppState {
    account: string;
    balance: string;
    flights: IFlight[];
}

export interface IFlight {
    name: string,
    price: string
}

export const useAppState = (): IAppState => {

    const contractAddress: string = '0x6BfE2DBd146114092A5CC06013674ACD397b08f7';
    const web3: Web3 = new Web3(Web3.givenProvider);
    const [account, setAccount] = useState<string>("");
    const [contract, setContract] = useState<Contract | null>(null);
    const [balance, setBalance] = useState<string>("0");
    const [flights, setFlights] = useState<IFlight[]>([]);

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
        }
    }, [contract]);

    const connectToWeb3 = async (): Promise<void> => {
        const accounts: string[] = await web3.eth.getAccounts();

        setAccount(accounts[0].toLowerCase());
    };

    const getContract = (): void => {
        let airlineContract: Contract;
        airlineContract = new web3.eth.Contract(AirlineContract.abi as AbiItem[], contractAddress);
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

    const getTotalFlights = async () => {
        let totalFlights: number = 0;
        let flights: IFlight[] = [];

        totalFlights = await contract?.methods.totalFlights().call();
        for (let i = 0; i < totalFlights; i++) {
            let flight = await contract?.methods.flights(i).call();
            flights.push(flight);
            setFlights(mapFlights(flights))
        }
    };

    const mapFlights = (flights: IFlight[]) => {
        return flights.map((flight: IFlight) => ({
            name: flight.name,
            price: converterToEther(flight.price.toString())
        }));
    };

    return { account, balance, flights };
};