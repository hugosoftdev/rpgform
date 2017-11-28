import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

const Sheets = new Mongo.Collection('Sheets');
export default Sheets;

// What we allow and deny on the client-side?
Sheets.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Sheets.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

export const sheetSchema = new SimpleSchema({
  _id: {
    type: String,
    optional: true,
  },
  type: { // NPC, Player, MC
    type: String,
  },
  group_id: {
    type: String,
  },
  player_name: { // Name for the sheet owner (null for NPC or MC)
    type: String,
  },
  status: { // Dead, Alive, Unconsious.
    type: String,
  },
  sheet: {
    type: Object,
  },


    'sheet.info': {
      type: Object,
    },
      'sheet.info.name': { // Character Name
        type: String,
      },
      'sheet.info.aligment': { // Lawfull, Neutral, Chaotic + Good, Neutral, Evil. Separated by one space.
        type: String, // Ex: 'Lawfull Neutral' 'Chaotic Good' 'Neutral Neutral'
      }, // https://i.imgur.com/ejREhwp.jpg (except Tyrion Lanister)
      'sheet.info.languages': { // Languages that char knows, input by Players or GM (No formating needed)
        type: String,
      },
      'sheet.info.race': { // Character race (no formating needed)
        type: String,
      },
      'sheet.info.speed': { // In Feets or Meters (needs to add a Mt ou Ft after the number)
        type: Number,
      },
      'sheet.info.Burrow': { // In Feets or Meters (needs to add a Mt ou Ft after the number)
        type: Number,
      },
      'sheet.info.Climb': { // In Feets or Meters (needs to add a Mt ou Ft after the number)
        type: Number,
      },
      'sheet.info.Fly': { // In Feets or Meters (needs to add a Mt ou Ft after the number)
        type: Number,
      },
      'sheet.info.Swim': { // In Feets or Meters (needs to add a Mt ou Ft after the number)
        type: Number,
      },
      'sheet.info.blindsight': { // CheckBox
        type: Boolean,
      },
      'sheet.info.darkvision': { // CheckBox
        type: Boolean,
      },
      'sheet.info.truesight': { // CheckBox
        type: Boolean,
      },
      'sheet.info.tremorsense': { // CheckBox
        type: Boolean,
      },
    
    
    'sheet.class': {
      type: Object,
    },
      'sheet.class.class': {
        type: String,
      },
      'sheet.class.dice': {
        type: String,
      },
      'sheet.class.level': {
        type: Number,
      },
      'sheet.class.xp': {
        type: Number,
      },
      'sheet.class.proeficiency': {
        type: Number,
      },
      'sheet.class.Iniciative': {
        type: Number,
      },
      /*
      'sheet.class.class_actions': {
        type: Object,
      },
      'sheet.class.class_resources': {
        type: Object,
      },
      */

    'sheet.stats':{
      type: Object,
    },
      'sheet.stats.hp': {
        type: Number,
      },
      'sheet.stats.maxhp': {
        type: Number,
      },
      'sheet.stats.ac': {
        type: Number,
      },
      'sheet.stats.hitdices': {
        type: Number,
      },
      'sheet.stats.maxhitices': {
        type: Number,
      },
      'sheet.stats.temphp': {
        type: Number,
      },
      'sheet.stats.death_saves_successes': {
        type: Number,
      },
      'sheet.stats.death_saves_failures': {
        type: Number,
      },
    

    'sheet.atributes': {
      type: Object,
    },
      'sheet.atributes.strength': {
        type: Number,
      },
      'sheet.atributes.dexterity': {
        type: Number,
      },
      'sheet.atributes.constitution': {
        type: Number,
      },
      'sheet.atributes.intelligence': {
        type: Number,
      },
      'sheet.atributes.wisdom': {
        type: Number,
      },
      'sheet.atributes.charisma': {
        type: Number,
      },

    'sheet.saving_throws': {
      type: Object,
    },
      'sheet.saving_throws.strength': {
        type: Boolean,
      },
      'sheet.saving_throws.dexterity': {
        type: Boolean,
      },
      'sheet.saving_throws.constitution': {
        type: Boolean,
      },
      'sheet.saving_throws.intelligence': {
        type: Boolean,
      },
      'sheet.saving_throws.wisdom': {
        type: Boolean,
      },
      'sheet.saving_throws.charisma': {
        type: Boolean,
      },
    

    'sheet.ability_checks': {
      type: Object,
    },
      'sheet.ability_checks.strength': {
        type: Boolean,
      },
      'sheet.ability_checks.dexterity': {
        type: Boolean,
      },
      'sheet.ability_checks.constitution': {
        type: Boolean,
      },
      'sheet.ability_checks.intelligence': {
        type: Boolean,
      },
      'sheet.ability_checks.wisdom': {
        type: Boolean,
      },
      'sheet.ability_checks.charisma': {
        type: Boolean,
      },

    
    
});

export const removeSchema = new SimpleSchema({
  _id: { type: String, optional: true },
});


Sheets.attachSchema(sheetSchema);
