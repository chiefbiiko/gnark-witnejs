package main

import (
	// "bytes"
	"encoding/hex"
	"fmt"
	// "reflect"
	// "testing"

	"github.com/consensys/gnark-crypto/ecc"
	// "github.com/consensys/gnark-crypto/ecc/bn254/fr"
	// "github.com/consensys/gnark/backend/witness"
	"github.com/consensys/gnark/frontend"
	// "github.com/consensys/gnark/io"
	// "github.com/stretchr/testify/require"
)

// const N_INS = 2
// const N_OUTS = 2
// const LEVELS = 5

// type Circuit struct {
// 	Root frontend.Variable `gnark:",public"`
// 	// extAmount = external amount used for deposits and withdrawals
// 	// correct extAmount range is enforced on the smart contract
// 	// publicAmount = extAmount - fee
// 	PublicAmount frontend.Variable `gnark:",public"`
// 	ExtDataHash  frontend.Variable `gnark:",public"`

// 	// data for transaction inputs
// 	InputNullifier [N_INS]frontend.Variable         `gnark:",public"`
// 	InSafe         [N_INS]frontend.Variable         `gnark:",secret"`
// 	InAmount       [N_INS]frontend.Variable         `gnark:",secret"`
// 	InPrivateKey   [N_INS]frontend.Variable         `gnark:",secret"`
// 	InBlinding     [N_INS]frontend.Variable         `gnark:",secret"`
// 	InToken        [N_INS]frontend.Variable         `gnark:",secret"`
// 	InNote         [N_INS]frontend.Variable         `gnark:",secret"`
// 	InPathIndices  [N_INS]frontend.Variable         `gnark:",secret"`
// 	InPathElements [N_INS][LEVELS]frontend.Variable `gnark:",secret"`

// 	// data for transaction outputs
// 	OutputCommitment [N_OUTS]frontend.Variable `gnark:",public"`
// 	OutSafe          [N_OUTS]frontend.Variable `gnark:",secret"`
// 	OutAmount        [N_OUTS]frontend.Variable `gnark:",secret"`
// 	OutPubkey        [N_OUTS]frontend.Variable `gnark:",secret"`
// 	OutBlinding      [N_OUTS]frontend.Variable `gnark:",secret"`
// 	OutToken         [N_OUTS]frontend.Variable `gnark:",secret"`
// 	OutNote          [N_OUTS]frontend.Variable `gnark:",secret"`
// }


type Circuit struct {
	X frontend.Variable `gnark:",public"`
}


func (c *Circuit) Define(api frontend.API) error {
	panic("not called")
}

func main() {
	// assert := require.New(t)

	// opts := []frontend.WitnessOption{
	// 	frontend.PublicOnly(),
	// }

	// assignment := &Circuit{
	// 	Root:         frontend.Variable("2082739236611797325080453634369239079537600201645783730211441698227947076239"),
	// 	PublicAmount: frontend.Variable("0"),
	// 	ExtDataHash:  frontend.Variable("4071348178776681774860420475568358368210912676584726714277361302891768785228"),
	// 	InputNullifier: [N_INS]frontend.Variable{
	// 		"7835388296314843636187257767424759997658499119928008289820475271954976476538",
	// 		"3798899406525323241895673860647988473012094951874558620586799079123249345528",
	// 	},
	// 	InSafe:   [N_INS]frontend.Variable{"0", "0"},
	// 	InAmount: [N_INS]frontend.Variable{"100000000000000000", "0"},
	// 	InPrivateKey: [N_INS]frontend.Variable{
	// 		"83954673773626130592400192362215810034236850567608633372771137553253627070073",
	// 		"94428126036374894755549601146157230593599630755378005406122897062030651793161",
	// 	},
	// 	InBlinding: [N_INS]frontend.Variable{
	// 		"289184164427839320485306849001486046229521124595132064080744981764368187374",
	// 		"356702006048331821443953090649120129330156729196723143421731616507451708350",
	// 	},
	// 	InToken: [N_INS]frontend.Variable{
	// 		"1184589422945421143511828701991100965039074119625",
	// 		"1184589422945421143511828701991100965039074119625",
	// 	},
	// 	InNote:        [N_INS]frontend.Variable{"0", "0"},
	// 	InPathIndices: [N_INS]frontend.Variable{"1", "0"},
	// 	InPathElements: [N_INS][LEVELS]frontend.Variable{
	// 		{
	// 			"11400236893008971901885143124958521084356975869654317251799391654791837928021",
	// 			"8995896153219992062710898675021891003404871425075198597897889079729967997688",
	// 			"15126246733515326086631621937388047923581111613947275249184377560170833782629",
	// 			"6404200169958188928270149728908101781856690902670925316782889389790091378414",
	// 			"17903822129909817717122288064678017104411031693253675943446999432073303897479",
	// 		},
	// 		{"0", "0", "0", "0", "0"},
	// 	},
	// 	OutputCommitment: [N_OUTS]frontend.Variable{
	// 		"17832654511599493864034414631554061075425736116204972551912983877495022265823",
	// 		"16603373619688897155654344480692315483931086991942797004076400322909681237079",
	// 	},
	// 	OutSafe:   [N_OUTS]frontend.Variable{"0", "0"},
	// 	OutAmount: [N_OUTS]frontend.Variable{"40000000000000000", "60000000000000000"},
	// 	OutBlinding: [N_OUTS]frontend.Variable{
	// 		"345579407108627460644481188701062114034593599050047198764705599357632517673",
	// 		"249017094180520992379219241055561384781249373505220481029720605701328279418",
	// 	},
	// 	OutPubkey: [N_OUTS]frontend.Variable{
	// 		"6411407462841906536816137161518299250774801015168708148698846593039083327999",
	// 		"9696282034755050002249722442370417427348178450830409466063672603382572608895",
	// 	},
	// 	OutToken: [N_OUTS]frontend.Variable{
	// 		"1184589422945421143511828701991100965039074119625",
	// 		"1184589422945421143511828701991100965039074119625",
	// 	},
	// 	OutNote: [N_OUTS]frontend.Variable{"0", "0"},
	// }
	assignment := &Circuit{
		X: frontend.Variable("9696282034755050002249722442370417427348178450830409466063672603382572608895"),
	}
	w, _ := frontend.NewWitness(assignment, ecc.BN254.ScalarField())//, opts...)
	// assert.NoError(err)
	buf, _ := w.MarshalBinary()
	// assert.NoError(err)
	fmt.Print(hex.EncodeToString(buf))
}

