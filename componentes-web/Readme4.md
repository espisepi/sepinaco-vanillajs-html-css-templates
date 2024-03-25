<script type="module">

	import world from './src/World.js';

	world.init();

	</script>

class world.js:


import * as YUKA from '../../../../build/yuka.module.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.109/build/three.module.js';
import { AssetManager } from './AssetManager.js';
import { Bullet } from './Bullet.js';
import { Enemy } from './Enemy.js';
import { Player } from './Player.js';
import { Ground } from './Ground.js';
import { CustomObstacle } from './CustomObstacle.js';
import { FirstPersonControls } from './FirstPersonControls.js';

const intersection = {
	point: new YUKA.Vector3(),
	normal: new YUKA.Vector3()
};
const target = new YUKA.Vector3();

class World {
