addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
	upgrades: {
		11: {
			name: "Speed Up",
			description: "Point generation *1.2.",
			cost: new Decimal(1),
			effect() {
				let eff = new Decimal(1.2)
				if (hasUpgrade('p', 22)) {eff.times(upgradeEffect('p', 22))}
				return eff
			}
		},
		12: {
			name: "Prestige Power",
			description: "Prestige points boost point generation.",
			cost: new Decimal(1),
			effect() {
				let eff = player.p.points.plus(2).pow(0.33)
				if (hasUpgrade('p', 22)) {eff.times(upgradeEffect('p', 22))}
				return eff
			}
		},
		13: {
			name: "Sufficiency",
			description: "Points boost their own generation.",
			cost: new Decimal(5),
			effect() {
				let eff = player.points.times(6).log(10)
				if (hasUpgrade('p', 22)) {eff.times(upgradeEffect('p', 22))}
				return eff
			}
		},
		21: {
			name: "Commonality",
			description: "Prestige point gain *1.8.",
			cost: new Decimal(20),
			effect() {
				let eff = new Decimal(1.8)
				if (hasUpgrade('p', 22)) {eff.times(upgradeEffect('p', 22))}
				return eff
			}
		},
		22: {
			name: "Elegant Efficiency",
			description: "All prestige upgrades *1.01.",
			cost: new Decimal(75),
			effect() {
				let eff = new Decimal(1.01)
				if (hasUpgrade('p', 32)) {eff.times(upgradeEffect('p', 32))}
				return eff
			}
		},
		23: {
			name: "Point Power",
			description: "Points boost prestige point generation.",
			cost: new Decimal(500),
			effect() {return player.points.times(7).log(9)}
		},
		31: {
			name: "Abundance",
			description: "Prestige point gain ^1.05.",
			cost: new Decimal(1e45)
		},
		32: {
			name: "Heuristics",
			description: "Points boost Elegant Efficiency.",
			cost: new Decimal(1e56)
		},
		33: {
			name: "Vertical Tactics",
			description: "Total prestige points boost Sufficiency and Point Power.",
			cost: new Decimal(1e60)
		}
	}
})
