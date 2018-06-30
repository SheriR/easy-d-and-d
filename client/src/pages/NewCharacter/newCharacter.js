import React, { Component } from 'react';
import API from '../../utils/API';
import {
    Container,
    Row,
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Card,
    CardHeader,
    CardText
} from 'reactstrap';

export class NewCharacter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            character_name: "",
            gender: "",
            race: "",
            class: "",
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0,
            baseBonus: {}
        };
    };

    applyRacialBonuses() {

        switch (document.getElementById('race').value) {

            case "":
                break;

            case "Dwarf":
                this.setState({
                    con: this.state.con + 2,
                    wis: this.state.wis + 2,
                    cha: this.state.cha - 2,
                    baseBonus: {
                        con: 2,
                        wis: 2,
                        cha: -2
                    }
                });
                break;

            case "Elf":
                this.setState({
                    dex: this.state.dex + 2,
                    int: this.state.int + 2,
                    con: this.state.con - 2,
                    baseBonus: {
                        dex: 2,
                        int: 2,
                        con: -2
                    }
                });
                break;

            case "Gnome":
                this.setState({
                    con: this.state.con + 2,
                    cha: this.state.cha + 2,
                    str: this.state.str - 2,
                    baseBonus: {
                        con: 2,
                        cha: 2,
                        str: -2
                    }
                });
                break;

            case "Half-elf":
                var statsArray = ["str", "dex", "con", "int", "wis", "cha"];
                const randStat = statsArray[Math.floor(Math.random() * statsArray.length)];
                var key = randStat;
                var val = 2;
                var obj = {};
                obj[key] = val;
                console.log(obj);
                this.setState(obj);
                break;

            case "Half-orc":
                var statsArray1 = ["str", "dex", "con", "int", "wis", "cha"];
                const randStat1 = statsArray1[Math.floor(Math.random() * statsArray1.length)];
                var key1 = randStat1;
                var val1 = 2;
                var obj1 = {};
                var statbonus = key1 + ": " + 2;
                obj1[key1] = val1;
                console.log(obj1);
                this.setState({
                    baseBonus: {
                        statbonus
                    }
                });
                break;

            case "Halfling":
                this.setState({
                    dex: this.state.dex + 2,
                    cha: this.state.cha + 2,
                    str: this.state.str - 2,
                    baseBonus: {
                        dex: 2,
                        cha: 2,
                        str: -2
                    }
                });
                break;

            case "Human":
                var statsArray2 = ["str", "dex", "con", "int", "wis", "cha"];
                const randStat2 = statsArray2[Math.floor(Math.random() * statsArray2.length)];
                var key2 = randStat2;
                var val2 = 2;
                var obj2 = {};
                obj2[key2] = val2;
                console.log(obj2);
                this.setState(obj2);
                break;

            default:
                alert("Chosen race not recognized.");
        };
    };

    handleInputChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleRaceChange = event => {
        // Destructure the name and value properties off of event.target
        // Update the appropriate state
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });

        this.setState({
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        }, () => {
            this.applyRacialBonuses();
            console.log(this.state);
        });

    };

    // OnClick function to randomize character gender
    randomizeGender = event => {
        event.preventDefault();
        const genders = ["Female", "Male"];
        const charGender = genders[Math.floor(Math.random() * genders.length)];
        document.getElementById("gender").value = charGender;

        this.setState({
            gender: charGender
        });
    };

    // OnClick function to randomize character race, reset stat rolls, and apply racial bonus to stats
    randomizeRace = event => {
        event.preventDefault();
        const races = ["Dwarf", "Elf", "Gnome", "Half-elf", "Half-orc", "Halfling", "Human"];
        const charRace = races[Math.floor(Math.random() * races.length)];
        document.getElementById("race").value = charRace;

        this.setState({
            race: charRace
        });

        this.setState({
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        }, () => {
            this.applyRacialBonuses();
        });
    };

    // OnClick function to randomize character class
    randomizeClass = event => {
        event.preventDefault();
        const classes = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rogue", "Sorcerer", "Wizard"];
        const charClass = classes[Math.floor(Math.random() * classes.length)];
        document.getElementById("class").value = charClass;
        this.setState({
            class: charClass
        });
    };

    // onClick function that simulates character stat rolls
    randomizeStats = event => {
        event.preventDefault();
        // Array to store the character stat rolls
        let charStats = [];

        // BubbleSort function to sort the 4 rolls in ascending order
        function bubbleSort(items) {
            var length = items.length;
            for (var i = (length - 1); i >= 0; i--) {
                //Number of passes
                for (var j = (length - i); j > 0; j--) {
                    //Compare the adjacent positions
                    if (items[j] < items[j - 1]) {
                        //Swap the numbers
                        var tmp = items[j];
                        items[j] = items[j - 1];
                        items[j - 1] = tmp;
                    }
                }
            }
            return items;
        };

        // Rolls 4 numbers and stores them in an array
        function statRolls() {
            let diceRolls = [];

            for (var i = 0; i < 4; i++) {
                let currentRoll = Math.floor((Math.random() * 6) + 1);
                diceRolls.push(currentRoll);
            };

            // Bubble sort the 4 rolls
            bubbleSort(diceRolls);
            // Remove the first item in the array (the lowest roll)
            diceRolls.shift();
            // Add the remaining rolls together
            var sum = diceRolls.reduce(function (a, b) { return a + b; }, 0);
            // Push that final number to the charStats array
            charStats.push(sum);
        };

        // Function to set the state to the random rolls
        function setStats() {

            // this.setState((previousState, props) => {
            //     console.log(previousState);

            //     return {
            //         str: charStats[0],
            //         dex: charStats[1],
            //         con: charStats[2],
            //         int: charStats[3],
            //         wis: charStats[4],
            //         cha: charStats[5]
            //     }
            // }, () => this.applyRacialBonuses());

            this.setState({
                str: charStats[0],
                dex: charStats[1],
                con: charStats[2],
                int: charStats[3],
                wis: charStats[4],
                cha: charStats[5]
            }, () => {
                // Function to apply racial bonuses from selected race
                console.log(this.state);
                this.applyRacialBonuses();
            });
        };

        // Function that calls statRolls 6 times
        function rollStats() {
            for (var x = 0; x < 6; x++) {
                statRolls.bind(this)();
            };

        };

        // Call the rollStats function and bind it to .this
        rollStats.bind(this)();
        // Set the state of the stats to the numbers rolled and bind it to .this
        setStats.bind(this)();

    };

    // Resets the state of the character stats
    resetStats = event => {
        event.preventDefault();
        this.setState({
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0
        });
    };

    // Submits the character data saved in this.state to the database
    handleFormSubmit = event => {
        event.preventDefault();

        console.log(this.state);
        API.saveCharacter({
            character_name: this.state.character_name,
            gender: this.state.gender,
            race: this.state.class,
            class: this.state.class,
            dex: this.state.dex,
            intel: this.state.int,
            stre: this.state.str,
            con: this.state.con,
            wis: this.state.wis,
            cha: this.state.cha
        });

        // Function to reset the form fields after submission to the DB    
        function resetForm() {
            document.getElementById("character_name").value = "";
            document.getElementById("gender").value = "";
            document.getElementById("race").value = "";
            document.getElementById("class").value = "";
            document.getElementById("character_name").value = "";
            this.setState({
                username: "",
                character_name: "",
                gender: "",
                race: "",
                class: "",
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                cha: 0
            });
        };

        // Calls resetForm and binds it to .this
        resetForm.bind(this)();
    };

    render() {
        return (
            <div>
                <Container>
                    <Form className="mt-5">
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="character_name">Character Name</Label>
                                    <Input type="text" name="character_name" id="character_name" onChange={this.handleInputChange} placeholder="Name your character" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label for="gender">Gender</Label>
                                    <Input type="select" name="gender" id="gender" defaultValue="" onChange={this.handleInputChange}>
                                        <option value="">Select character's gender</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <Button className="mt-4" onClick={this.randomizeGender} color="info">Random Gender</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="race">Race</Label>
                                    <Input type="select" name="race" id="race" defaultValue="" onChange={this.handleRaceChange}>
                                        <option value="">Select character's race</option>
                                        <option value="Dwarf">Dwarf</option>
                                        <option value="Elf">Elf</option>
                                        <option value="Gnome">Gnome</option>
                                        <option value="Half-elf">Half-elf</option>
                                        <option value="Half-orc">Half-orc</option>
                                        <option value="Halfling">Halfling</option>
                                        <option value="Human">Human</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <Button className="mt-4" onClick={this.randomizeRace} color="info">Random Race</Button>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <Label for="class">Class</Label>
                                    <Input type="select" name="class" id="class" defaultValue="" onChange={this.handleInputChange}>
                                        <option value="">Select character's class</option>
                                        <option value="Barbarian">Barbarian</option>
                                        <option value="Bard">Bard</option>
                                        <option value="Cleric">Cleric</option>
                                        <option value="Druid">Druid</option>
                                        <option value="Fighter">Fighter</option>
                                        <option value="Monk">Monk</option>
                                        <option value="Paladin">Paladin</option>
                                        <option value="Ranger">Ranger</option>
                                        <option value="Rogue">Rogue</option>
                                        <option value="Sorcerer">Sorcerer</option>
                                        <option value="Wizard">Wizard</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col>
                                <Button className="mt-4" onClick={this.randomizeClass} color="info">Random Class</Button>
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col md="2">
                                <Card>
                                    <CardHeader className="text-center" tag="h5">Strength</CardHeader>
                                    <CardText className="text-center my-3">{this.state.str}</CardText>
                                </Card>
                            </Col>
                            <Col md="2">
                                <Card>
                                    <CardHeader className="text-center" tag="h5">Dexterity</CardHeader>
                                    <CardText className="text-center my-3">{this.state.dex}</CardText>
                                </Card>
                            </Col>
                            <Col md="2">
                                <Card>
                                    <CardHeader className="text-center" tag="h5">Constitution</CardHeader>
                                    <CardText className="text-center my-3">{this.state.con}</CardText>
                                </Card>
                            </Col>
                            <Col md="2">
                                <Card>
                                    <CardHeader className="text-center" tag="h5">Intelligence</CardHeader>
                                    <CardText className="text-center my-3">{this.state.int}</CardText>
                                </Card>
                            </Col>
                            <Col md="2">
                                <Card>
                                    <CardHeader className="text-center" tag="h5">Wisdom</CardHeader>
                                    <CardText className="text-center my-3">{this.state.wis}</CardText>
                                </Card>
                            </Col>
                            <Col md="2">
                                <Card>
                                    <CardHeader className="text-center" tag="h5">Charisma</CardHeader>
                                    <CardText className="text-center my-3">{this.state.cha}</CardText>
                                </Card>
                            </Col>
                        </Row>
                        <Row className="my-3">
                            <Col>
                                <Button className="mr-3" color="info" onClick={this.randomizeStats}>Generate Stats</Button>
                                <Button color="info" onClick={this.resetStats}>Reset Stats</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="info" type="submit" onClick={this.handleFormSubmit}>Save Character</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>
        );
    }
};