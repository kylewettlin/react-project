import React, { useState } from 'react';
import AgentCard from '../../components/AgentCard/AgentCard';
import './AgentList.css';

// Import agent images
import brimstoneImg from '../../assets/images/agents/Brimstone.png';
import phoenixImg from '../../assets/images/agents/Phoenix.png';
import jettImg from '../../assets/images/agents/Jett.png';
import chamberImg from '../../assets/images/agents/Chamber.png';
import killjoyImg from '../../assets/images/agents/Killjoy.png';
import sovaImg from '../../assets/images/agents/Sova.png';
import sageImg from '../../assets/images/agents/Sage.png';
import omenImg from '../../assets/images/agents/Omen.png';
import viperImg from '../../assets/images/agents/Viper.png';
import skyeImg from '../../assets/images/agents/Skye.png';
import razeImg from '../../assets/images/agents/Raze.png';
import reynaImg from '../../assets/images/agents/Reyna.png';
import cypherImg from '../../assets/images/agents/Cypher.png';
import kayoImg from '../../assets/images/agents/Kayo.png';
import yoruImg from '../../assets/images/agents/Yoru.png';
import fadeImg from '../../assets/images/agents/Fade.png';
import neonImg from '../../assets/images/agents/Neon.png';
import harborImg from '../../assets/images/agents/Harbor.png';
import gekkoImg from '../../assets/images/agents/Gekko.png';
import deadlockImg from '../../assets/images/agents/Deadlock.png';
import isoImg from '../../assets/images/agents/Iso.png';
import cloveImg from '../../assets/images/agents/Clove.png';
import breachImg from '../../assets/images/agents/Breach.png';
import astraImg from '../../assets/images/agents/Astra.png';

const AgentList = () => {
  const [filter, setFilter] = useState('all');

  // Sample agent data (would be loaded from JSON/API in real app)
  const agents = [
    {
      id: 1,
      name: "Brimstone",
      role: "Controller",
      image: brimstoneImg,
      description: "Brimstone's orbital arsenal ensures his squad always has the advantage.",
      abilities: [
        { name: "Incendiary", description: "Launch an incendiary grenade that deploys a damaging field of fire." },
        { name: "Sky Smoke", description: "Deploy a tactical map to call in orbital smoke drops." },
        { name: "Stim Beacon", description: "Target a nearby location to call in a stim beacon, giving players RapidFire." },
        { name: "Orbital Strike", description: "Use a tactical map to target an orbital strike, creating a damaging zone." }
      ]
    },
    {
      id: 2,
      name: "Phoenix",
      role: "Duelist",
      image: phoenixImg,
      description: "Phoenix's star power shines through in his fighting style, igniting the battlefield with flash and flare.",
      abilities: [
        { name: "Curveball", description: "Cast a curved flare that blinds any player who looks at it." },
        { name: "Hot Hands", description: "Throw a fireball that explodes after a delay or upon impact with the ground." },
        { name: "Blaze", description: "Cast a flame wall that blocks vision and damages players passing through it." },
        { name: "Run it Back", description: "Mark your current location, then become invulnerable and die to return to that location." }
      ]
    },
    {
      id: 3,
      name: "Jett",
      role: "Duelist",
      image: jettImg,
      description: "Representing her home country of South Korea, Jett's agile and evasive fighting style lets her take risks no one else can.",
      abilities: [
        { name: "Updraft", description: "Propels Jett high into the air." },
        { name: "Tailwind", description: "Jett dashes a short distance in the direction she is moving." },
        { name: "Cloudburst", description: "Throws a projectile that expands into a brief vision-blocking cloud." },
        { name: "Blade Storm", description: "Equips Jett with several throwing knives that deal moderate to heavy damage." }
      ]
    },
    {
      id: 4,
      name: "Sage",
      role: "Sentinel",
      image: sageImg,
      description: "The bastion of China, Sage creates safety for herself and her team wherever she goes.",
      abilities: [
        { name: "Barrier Orb", description: "Creates a solid wall that blocks movement and gunfire." },
        { name: "Slow Orb", description: "Creates a slowing field that damages and slows enemies who walk on it." },
        { name: "Healing Orb", description: "Heals an ally or herself over time." },
        { name: "Resurrection", description: "Revives a dead ally with full health." }
      ]
    },
    {
      id: 5,
      name: "Killjoy",
      role: "Sentinel",
      image: killjoyImg,
      description: "The genius of Germany, Killjoy secures the battlefield with ease using her arsenal of inventions.",
      abilities: [
        { name: "Alarmbot", description: "Deploy a bot that hunts down enemies that get in range." },
        { name: "Turret", description: "Deploy a turret that fires at enemies in a 180-degree cone." },
        { name: "Nanoswarm", description: "Throw a grenade that goes covert when it lands." },
        { name: "Lockdown", description: "Deploy a device that detains all enemies caught in the radius." }
      ]
    },
    {
      id: 6,
      name: "Skye",
      role: "Initiator",
      image: skyeImg,
      description: "Hailing from Australia, Skye and her band of beasts trail-blaze the way through hostile territory.",
      abilities: [
        { name: "Trailblazer", description: "Control a Tasmanian tiger that can leap forward and explode in a concussive blast." },
        { name: "Guiding Light", description: "Channel a hawk that can be guided forward and flashes what it sees." },
        { name: "Regrowth", description: "Channel to heal allies in range and line of sight." },
        { name: "Seekers", description: "Equip a trinket that reveals the location of the closest enemy." }
      ]
    },
    {
      id: 7,
      name: "Sova",
      role: "Initiator",
      image: sovaImg,
      description: "Born from the eternal winter of Russia's tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision.",
      abilities: [
        { name: "Shock Bolt", description: "Fire an explosive bolt that emits a damaging pulse of static energy." },
        { name: "Recon Bolt", description: "Fire a bolt that deploys a sonar emitter, tagging nearby enemies." },
        { name: "Owl Drone", description: "Deploy a remote-controlled drone that can fire a dart that reveals enemies." },
        { name: "Hunter's Fury", description: "Fire up to three energy blasts that pierce through walls and damage enemies." }
      ]
    },
    {
      id: 8,
      name: "Viper",
      role: "Controller",
      image: viperImg,
      description: "The American chemist, Viper deploys an array of poisonous chemical devices to control the battlefield and cripple the enemy's vision.",
      abilities: [
        { name: "Poison Cloud", description: "Throw a gas emitter that you can reactivate to create a poisonous smoke cloud." },
        { name: "Toxic Screen", description: "Deploy a line of gas emitters that can be reactivated to create a tall wall of toxic gas." },
        { name: "Snake Bite", description: "Fire a projectile that creates a pool of damaging acid." },
        { name: "Viper's Pit", description: "Spray a chemical cloud in a large area that reduces vision and maximum health of enemies." }
      ]
    },
    {
      id: 9,
      name: "Omen",
      role: "Controller",
      image: omenImg,
      description: "A phantom of a memory, Omen hunts in the shadows. He renders enemies blind, teleports across the field, then lets paranoia take hold.",
      abilities: [
        { name: "Paranoia", description: "Send out an ethereal shadow in a straight line, nearsighting anyone it touches." },
        { name: "Dark Cover", description: "Cast an orb that bursts into a sphere of shadow obscuring vision." },
        { name: "Shrouded Step", description: "After a delay, teleport a short distance." },
        { name: "From the Shadows", description: "Select anywhere on the map to teleport and reform." }
      ]
    },
    {
      id: 10,
      name: "Raze",
      role: "Duelist",
      image: razeImg,
      description: "Raze explodes out of Brazil with her big personality and big guns. With her blunt-force-trauma playstyle, she excels at flushing entrenched enemies.",
      abilities: [
        { name: "Blast Pack", description: "Throw a C4 that sticks to surfaces. Re-use to detonate." },
        { name: "Paint Shells", description: "Throw a grenade that damages and creates submunitions." },
        { name: "Boom Bot", description: "Deploy a bot that travels in a straight line, bouncing off walls." },
        { name: "Showstopper", description: "Equip a rocket launcher. Fire shoots a rocket that does massive area damage." }
      ]
    },
    {
      id: 11,
      name: "Chamber",
      role: "Sentinel",
      image: chamberImg,
      description: "Well dressed and well armed, French weapons designer Chamber expels aggressors with deadly precision.",
      abilities: [
        { name: "Trademark", description: "Place a trap that scans for enemies. When a visible enemy comes in range, it starts a countdown and then destabilizes the terrain around them." },
        { name: "Headhunter", description: "Activate to equip a heavy pistol. Alt Fire with the pistol equipped to aim down sights." },
        { name: "Rendezvous", description: "Place two teleport anchors. Teleport to the other anchor by interacting with the anchor you're near." },
        { name: "Tour De Force", description: "Activate to summon a powerful, custom sniper rifle that will kill an enemy with any direct hit." }
      ]
    },
    {
      id: 12,
      name: "Reyna",
      role: "Duelist",
      image: reynaImg,
      description: "Forged in the heart of Mexico, Reyna dominates single combat, popping off with each kill she scores.",
      abilities: [
        { name: "Devour", description: "Enemies killed by Reyna leave behind Soul Orbs that can be consumed to rapidly heal." },
        { name: "Dismiss", description: "Consume a Soul Orb to become intangible for a short time." },
        { name: "Leer", description: "Cast an ethereal eye that nearsights all enemies who look at it." },
        { name: "Empress", description: "Enter a frenzy, increasing firing, equip and reload speed dramatically." }
      ]
    },
    {
      id: 13,
      name: "Cypher",
      role: "Sentinel",
      image: cypherImg,
      description: "The Moroccan information broker, Cypher is a one-man surveillance network who keeps tabs on the enemy's every move.",
      abilities: [
        { name: "Cyber Cage", description: "Toss a remote activation trap that creates a cage once activated." },
        { name: "Spycam", description: "Place a remote camera that can be controlled to fire tracking darts." },
        { name: "Trapwire", description: "Place a tripwire that reveals, slows, and staggers enemies." },
        { name: "Neural Theft", description: "Extract information from a fresh enemy corpse, revealing the location of their allies." }
      ]
    },
    {
      id: 14,
      name: "KAY/O",
      role: "Initiator",
      image: kayoImg,
      description: "KAY/O is a machine of war built for a single purpose: neutralizing radiants.",
      abilities: [
        { name: "FLASH/drive", description: "Throw a flash grenade that explodes after a short fuse." },
        { name: "ZERO/point", description: "Throw a knife that suppresses anyone hit by it, preventing ability usage." },
        { name: "FRAG/ment", description: "Throw an explosive fragment that sticks to the floor and explodes multiple times." },
        { name: "NULL/cmd", description: "Overload and pulse radianite energy, suppressing nearby enemies." }
      ]
    },
    {
      id: 15,
      name: "Yoru",
      role: "Duelist",
      image: yoruImg,
      description: "Japanese native Yoru rips holes through reality to infiltrate enemy lines unseen.",
      abilities: [
        { name: "Blindside", description: "Tear unstable reality to send a flash forward." },
        { name: "Gatecrash", description: "Place a rift tether and teleport to it later." },
        { name: "Fakeout", description: "Create a fake footstep sound." },
        { name: "Dimensional Drift", description: "Mask yourself to travel between dimensions, becoming invisible to enemies." }
      ]
    },
    {
      id: 16,
      name: "Fade",
      role: "Initiator",
      image: fadeImg,
      description: "Turkish bounty hunter Fade unleashes the power of raw nightmare to seize enemy secrets.",
      abilities: [
        { name: "Seize", description: "Throw an orb that creates a tether on enemies caught within." },
        { name: "Haunt", description: "Send a nightmarish entity that reveals enemies in its line of sight." },
        { name: "Prowler", description: "Send a creature that tracks down enemies and nearsights them." },
        { name: "Nightfall", description: "Send waves of nightmare energy that reveal and deafen enemies." }
      ]
    },
    {
      id: 17,
      name: "Neon",
      role: "Duelist",
      image: neonImg,
      description: "Filipino Agent Neon surges forward at shocking speeds, discharging bursts of bioelectric radiance as fast as her body generates it.",
      abilities: [
        { name: "Relay Bolt", description: "Throw an energy bolt that bounces once and electrifies the ground below it." },
        { name: "High Gear", description: "Channel power to increase your speed." },
        { name: "Fast Lane", description: "Fire two energy lines that create walls blocking vision." },
        { name: "Overdrive", description: "Channel your full power and speed and fire electrified energy at enemies." }
      ]
    },
    {
      id: 18,
      name: "Harbor",
      role: "Controller",
      image: harborImg,
      description: "Hailing from India's coast, Harbor uses ancient technology to manipulate water for strategic control.",
      abilities: [
        { name: "Cove", description: "Deploy a sphere of water that blocks bullets." },
        { name: "Cascade", description: "Send a wave of water rolling forward, passing through walls." },
        { name: "High Tide", description: "Deploy a wall of water that can be bent into a targeted direction." },
        { name: "Reckoning", description: "Create a geyser pool that pulses and concusses players in its zone." }
      ]
    },
    {
      id: 19,
      name: "Gekko",
      role: "Initiator",
      image: gekkoImg,
      description: "Gekko leads a tight-knit crew of calamitous creatures from Los Angeles.",
      abilities: [
        { name: "Wingman", description: "Send a winged creature that plants or defuses the spike." },
        { name: "Dizzy", description: "Send a plasma blob that blinds enemies." },
        { name: "Mosh Pit", description: "Send a creature that explodes and stuns enemies." },
        { name: "Thrash", description: "Send a creature to hunt down enemies and explode." }
      ]
    },
    {
      id: 20,
      name: "Deadlock",
      role: "Sentinel",
      image: deadlockImg,
      description: "Norwegian operative Deadlock secures the battlefield with an array of high-tech barricades.",
      abilities: [
        { name: "Sonic Sensor", description: "Deploy a sensor that detects approaching enemies and concusses them." },
        { name: "Barrier Mesh", description: "Deploy a barrier that blocks movement and bullets." },
        { name: "GravNet", description: "Throw a grenade that detonates and pulls enemies toward its center." },
        { name: "Annihilation", description: "Deploy a nanowire accelerator that captures and kills enemies." }
      ]
    },
    {
      id: 21,
      name: "Iso",
      role: "Duelist",
      image: isoImg,
      description: "Chinese infiltrator Iso channels his triad experience to separate enemies from their allies.",
      abilities: [
        { name: "Double Tap", description: "Fire a defensive bolt that prevents enemies from using abilities." },
        { name: "Contingency", description: "Create a clone that can be swapped with." },
        { name: "Undercut", description: "Send a disc that disrupts enemy vision and abilities." },
        { name: "Killswitch", description: "Target and separate the strongest enemy agent from their team." }
      ]
    },
    {
      id: 22,
      name: "Clove",
      role: "Controller",
      image: cloveImg,
      description: "Irish agent Clove can repeatedly return from death, ensuring they always finish the job.",
      abilities: [
        { name: "Meddle", description: "Target a specific location to track the enemy that passes through it." },
        { name: "Pick Me Up", description: "Throw a stimulant onto the ground that heals Clove and allies." },
        { name: "Not Dead Yet", description: "After being killed, enter a ghostly form for a limited time." },
        { name: "Rejuvenation", description: "Use a device that revives allies to full health after they die." }
      ]
    },
    {
      id: 23,
      name: "Breach",
      role: "Initiator",
      image: breachImg,
      description: "The bionic Swede Breach fires powerful, targeted kinetic blasts to aggressively clear a path through enemy ground.",
      abilities: [
        { name: "Flashpoint", description: "Blind all players looking at it, including allies." },
        { name: "Fault Line", description: "Fire a quake that dazes all players in its zone and travels through walls." },
        { name: "Aftershock", description: "Fuse a delayed blast to the wall that damages heavily." },
        { name: "Rolling Thunder", description: "Send a cascading quake that knocks up, dazes, and damages enemies." }
      ]
    },
    {
      id: 24,
      name: "Astra",
      role: "Controller",
      image: astraImg,
      description: "Ghanaian Agent Astra harnesses the energies of the cosmos to reshape battlefields to her whim.",
      abilities: [
        { name: "Nova Pulse", description: "Place stars in Astral Form then activate to detonate a concussive nova pulse." },
        { name: "Nebula", description: "Create a smoke obstacle by activating a star." },
        { name: "Gravity Well", description: "Activate a star to form a gravity well, pulling players toward its center." },
        { name: "Astral Form / Cosmic Divide", description: "Enter Astral Form to place stars then activate a cosmic divide barrier." }
      ]
    }
  ];

  const filteredAgents = filter === 'all' 
    ? agents 
    : agents.filter(agent => agent.role.toLowerCase() === filter.toLowerCase());

  return (
    <div className="agent-list-page">
      {/* Page Header */}
      <section className="page-header">
        <h1>Agent Library</h1>
        <p className="subtitle">Learn about all Valorant agents and their abilities</p>
      </section>

      {/* Filter Controls */}
      <section className="filter-section">
        <div className="filter-container">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'duelist' ? 'active' : ''}`} 
            onClick={() => setFilter('duelist')}
          >
            Duelist
          </button>
          <button 
            className={`filter-btn ${filter === 'initiator' ? 'active' : ''}`} 
            onClick={() => setFilter('initiator')}
          >
            Initiator
          </button>
          <button 
            className={`filter-btn ${filter === 'controller' ? 'active' : ''}`} 
            onClick={() => setFilter('controller')}
          >
            Controller
          </button>
          <button 
            className={`filter-btn ${filter === 'sentinel' ? 'active' : ''}`} 
            onClick={() => setFilter('sentinel')}
          >
            Sentinel
          </button>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="agents-container">
        <div className="agent-grid">
          {filteredAgents.map(agent => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AgentList; 