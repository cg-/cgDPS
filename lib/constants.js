// where are we
if(Meteor.isServer){
  METEOR_ROOT = process.cwd();
  APPLICATION_ROOT = METEOR_ROOT + '/../'
  if( Meteor.npmRequire('path').basename( Meteor.npmRequire('fs').realpathSync( METEOR_ROOT + '/../../../' ) ) == '.meteor' ){
      APPLICATION_ROOT =  Meteor.npmRequire('fs').realpathSync( METEOR_ROOT + '/../../../../' );
  }
  ASSETS_FOLDER = METEOR_ROOT + '/server/assets/' + Meteor.npmRequire('path').basename( APPLICATION_ROOT );
}
