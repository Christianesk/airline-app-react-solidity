const Airline = artifacts.require('Airline');

contract('Airline', async accounts => {

    let instance;

    beforeEach(async () => {
        instance = await Airline.new();
    });

    it('should have available flights', async () => {
        let total = await instance.totalFlights();
        expect(total > 0).to.be.true;
        expect(total.words[0]).to.be.equals(3);
    });

    it('should allow customers to buy a flight providing its value', async () => {
        let { name, price } = await instance.flights(0);
        await instance.buyFlight(0, { from: accounts[0], value: price });
        let customerFlight = await instance.customerFlights(accounts[0], 0);
        let customerTotalFlight = await instance.customerTotalFlights(accounts[1]);

        expect(customerFlight.name).to.be.equals(name);
        expect(customerFlight.price.length).to.be.equal(price.length);
        expect(customerFlight.price).to.deep.equal(price);
        expect(customerTotalFlight.length).to.be.equal(1);
    });

    it('should not allow customers to buy flights under the price', async () => {
        let flight = await instance.flights(0);
        let price = flight[1] - 5000;
        try {
            await instance.buyFlight(0, { from: accounts[0], value: price });
        }
        catch (e) {
            return;
        }
        assert.fail();
    });

    it('should get the real balance of the contract', async () => {
        let flight = await instance.flights(0);
        let price = flight[1];

        let flight2 = await instance.flights(1);
        let price2 = flight2[1];

        await instance.buyFlight(0, { from: accounts[0], value: price });
        await instance.buyFlight(1, { from: accounts[0], value: price2 });

        let newAirlineBalance = await instance.getAirlineBalance();

        expect(BigInt(newAirlineBalance)).to.be.equal(BigInt(price) + BigInt(price2));
    });

    it('should allow customers to redeem loyalty points', async () => {
        let flight = await instance.flights(1);
        let price = flight[1];

        await instance.buyFlight(1, { from: accounts[0], value: price });
        let balance = await web3.eth.getBalance(accounts[0]);
        await instance.redeemLoyaltyPoints({ from: accounts[0] });
        let finalBalance = await web3.eth.getBalance(accounts[0]);

        let { loyaltyPoints } = await instance.customers(accounts[0]);


        expect(BigInt(loyaltyPoints)).to.be.equals(0);
        expect(finalBalance > balance).to.be.true;
    });
});