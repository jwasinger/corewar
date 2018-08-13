import * as chai from "chai";
import * as sinon from "sinon";
import * as sinonChai from "sinon-chai";
var expect = chai.expect;
chai.use(sinonChai);

import { IMatch } from "../interface/IMatch";
import { IParseResult } from "../../parser/interface/IParseResult";
import TestHelper from "../../simulator/tests/TestHelper";
import { IMatchRunner } from "../interface/IMatchRunner";
import { MatchRunner } from "../MatchRunner";

describe("MatchRunner", () => {

    let matchRunner: IMatchRunner;

    beforeEach(() => {

        const publisher = TestHelper.buildPublisher();
        const simulator = {
            initialise: sinon.stub(),
            run: sinon.stub(),
            step: sinon.stub(),
            getState: sinon.stub()
        };
        (<sinon.stub>simulator.run).returns({});

        matchRunner = new MatchRunner(simulator, publisher);
    });

    it("Assigns a unique match ID to each warrior", () => {

        const expected = [0, 1, 2];

        const match: IMatch = {
            rules: {
                rounds: 1,
                options: {}
            },
            warriors: [
                { source: TestHelper.buildParseResult([]) },
                { source: TestHelper.buildParseResult([]) },
                { source: TestHelper.buildParseResult([]) }
            ]
        };

        const actual = matchRunner.run(match);

        expect(actual.warriors.length).to.be.equal(expected.length);
        for (let i = 0; i < expected.length; i++) {
            expect(actual.warriors[i].warriorMatchId).to.be.equal(expected[i]);
        }
    });
});