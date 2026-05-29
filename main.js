/**
 * 
 * PROPERTY OF ALEXANDRIA PAGRAM
 * Github - alexandria-p
 * LinkedIn - in/alexandriapagram
 * 
 * 
 * TODO - touchscreen & controller support?
 */
if(Shimeji === undefined)
{
	var Shimeji = {};
}

Shimeji.modid = 'shimejiMod';
Shimeji.name = 'Pusheen Cat Desktop Buddy (Shimeji) Mod';
Shimeji.version = '1.000';
Shimeji.GameVersion = '2.043';

Shimeji.kittenHelpers = [];
Shimeji.meowSound = Math.floor(Math.random()*4)+1;

Shimeji.kittenSize = 160; // assumes kittens are square

Shimeji.kittenWalkSpeed = 5;
Shimeji.kittenFallSpeed = 10;

Shimeji.KittenActions = {
	Walk: "walk",
	Dream: "dream",
	Idle: "idle",
	Drag: "drag",
	Fall: "fall"
}

Shimeji.KittenTypes = {
	Helpers: 1, 	//"Kitten helpers",
	Workers: 2, 	//"Kitten workers",
	Engineers: 3, 	//"Kitten engineers",
	Overseers: 4, 	//"Kitten overseers",
	Managers: 5, 	//"Kitten managers",
	Accountants: 6, //"Kitten accountants",
	Specialists: 7, //"Kitten specialists",
	Experts: 8, 	//"Kitten experts",
	Consultants: 9, //"Kitten consultants",
	Assistants: 10, //"Kitten assistants to the regional manager",
	Marketeers: 11, //"Kitten marketeers",
	Analysts: 12, 	//"Kitten analysts",
	Executives: 13, //"Kitten executives",
	Admins: 14,		//"Kitten admins",
	Angels: 15, 	//"Kitten angels"
}

/**
 * Returns a random number between min (inclusive) and max (inclusive)
 * Feed in whole numbers (integers) please! -- nom nom nom.
 */
Shimeji.getRandomInt = function(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Shimeji.InSquare = function(mouseX,mouseY,rect)
{
	if ( mouseX >= rect.x && mouseX <= rect.x + rect.w
    &&   mouseY >= rect.y && mouseY <= rect.y + rect.h ) {
        return true;
    }
    return false;
}


Shimeji.RemoveKittens = function(numForRemoval) 
{
    // remove angels first, 
    // then just pop.

    var numRemoved = 0;
	Shimeji.kittenHelpers = Shimeji.kittenHelpers.filter(function(k) {
        if (numRemoved < numForRemoval && k.type === Shimeji.KittenTypes.Angels) {
            numRemoved++;
            return false;
        }
        return true;
    });

	var difference = numForRemoval - numRemoved;
    if (difference > 0) {
    	for (var i = 0; i < difference; i++)
		{
			Shimeji.kittenHelpers.pop();
		}
    }
    
}

function AreKittensUnderMaxCount()
{
	if (pusheenMatchKittensToShopCount) {
		return (Shimeji.kittenHelpers.length < maxPusheen) && (Shimeji.kittenHelpers.length < GetCurrentShopCountOfKittens());
	}
	else {
		return (Shimeji.kittenHelpers.length < pusheenCustomCount);
	}
}

function GetCurrentShopCountOfKittens() {
	var shopCount = 0;
	if (Game.Has('Kitten helpers')) shopCount++;
	if (Game.Has('Kitten workers')) shopCount++;
	if (Game.Has('Kitten engineers')) shopCount++;
	if (Game.Has('Kitten overseers')) shopCount++;
	if (Game.Has('Kitten managers')) shopCount++;
	if (Game.Has('Kitten accountants')) shopCount++;
	if (Game.Has('Kitten specialists')) shopCount++;
	if (Game.Has('Kitten experts')) shopCount++;
	if (Game.Has('Kitten consultants')) shopCount++;
	if (Game.Has('Kitten assistants to the regional manager')) shopCount++;
	if (Game.Has('Kitten marketeers')) shopCount++;
	if (Game.Has('Kitten analysts')) shopCount++;
	if (Game.Has('Kitten executives')) shopCount++;
	if (Game.Has('Kitten admins')) shopCount++;
	if (Game.Has('Kitten angels')) shopCount++;
	//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"shop count: "+shopCount);
	return shopCount;
}


Shimeji.CheckForNewKittenHelpers = function()
{	
	if (AreKittensUnderMaxCount() && Game.Has('Kitten helpers') 
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Helpers; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Helpers);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten workers')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Workers; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Workers);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten engineers')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Engineers; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Engineers);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten overseers')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Overseers; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Overseers);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten managers')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Managers; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Managers);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten accountants')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Accountants; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Accountants);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten specialists')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Specialists; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Specialists);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten experts')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Experts; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Experts);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten consultants')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Consultants; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Consultants);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten assistants to the regional manager')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Assistants; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Assistants);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten marketeers')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Marketeers; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Marketeers);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten analysts')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Analysts; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Analysts);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten executives')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Executives; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Executives);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten admins')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Admins; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Admins);
	}
	if (AreKittensUnderMaxCount() && Game.Has('Kitten angels')
		&& (Shimeji.kittenHelpers.filter(function(k) { return k.type === Shimeji.KittenTypes.Angels; }).length === 0))
	{
		Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Angels);
	}
}

Shimeji.SpawnKittenHelper = function(type)
{
	var id = (Shimeji.kittenHelpers == null) ? 0 : Shimeji.kittenHelpers.length;
	
	Shimeji.kittenHelpers.push(
		{
			id: id,
			type:type, // type acts like the id, as an enum
			x:null,
			y:null,
			rotation:0,
			hovered:0,
			lastFrame:0,
			movingClockwise:true,
			currentAction:Shimeji.KittenActions.Walk,
			nextActionAvailableAt:Game.time,
			turningBufferExpiresAt:Game.time,
			changedAction:true,
			clickedAtOriginPosition: null
		});
}

// todo - I think there is a miscalculation at the top of the screen... ceiling
Shimeji.MoveKitten = function(kitten) {
	// Rotation can be:
	// 0 - walking along floor
	// 90 - walking along right wall
	// 180 - walking along ceiling
	// 270 - walking along left wall

	// 0,0 is the top-left hand side of the canvas.
	// maximum values must account for size of kitten
	const ctx=Game.LeftBackground;
	const maxWidth=ctx.canvas.width - Shimeji.kittenSize;
	const maxHeight=ctx.canvas.height - Shimeji.kittenSize;

	let targetPosition;
	const isMovingHorizontal = (kitten.rotation == 0 || kitten.rotation == 180);
	const turningBufferTimeInMilliseconds = 2000;
	
	let speed = Shimeji.kittenWalkSpeed;
	
	// Handle moving along surfaces
	if (kitten.rotation == 0)
		targetPosition = kitten.x + ((kitten.movingClockwise) ? speed : -speed);
	else if (kitten.rotation == 90)
		targetPosition = kitten.y - ((kitten.movingClockwise) ? speed : -speed);
	else if (kitten.rotation == 180)
		targetPosition = kitten.x - ((kitten.movingClockwise) ? speed : -speed);
	else
		targetPosition = kitten.y + ((kitten.movingClockwise) ? speed : -speed);
	
	// Check if we've hit an edge
	if (kitten.turningBufferExpiresAt <= Date.now() && CheckIfShimejiShouldTurnAround(targetPosition)) {
		//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"Original Rotation: "+kitten.rotation+", Clockwise: "+kitten.movingClockwise);
		kitten.turningBufferExpiresAt = Date.now() + turningBufferTimeInMilliseconds; // so we dont double up on turns
		
		// If we've passed a threshold,
		// either turn around, or have chance to climb up wall
		
		// 1 in 3 chance of climbing the wall
		let chanceOutcome = Shimeji.getRandomInt(1,3);
		//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"turn around bright eyes");
		
		if (chanceOutcome <= 2) {
			kitten.movingClockwise = !kitten.movingClockwise;
		}
		else {
			ChangeClimbingSurface();
		}
		
		//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"New Rotation: "+kitten.rotation+", Clockwise: "+kitten.movingClockwise);
	}
	else {
		// If we've NOT hit the edge of the screen, continue moving.
		if (isMovingHorizontal)
			kitten.x = targetPosition;
		else
			kitten.y = targetPosition;
	}

	function CheckIfShimejiShouldTurnAround(newPosition) {
		if (kitten.rotation == 0) {
			if (kitten.movingClockwise && newPosition >= maxWidth) {
				return true;
			} else if (!kitten.movingClockwise && newPosition <= 0) {
				return true;
			}
		}
		if (kitten.rotation == 90) {
			if (kitten.movingClockwise && newPosition <= 0) {
				return true;
			} else if (!kitten.movingClockwise && newPosition >= maxHeight) {
				return true;
			}
		}
		else if (kitten.rotation == 180) {
			if (kitten.movingClockwise && newPosition <= 0) {
				return true;
			} else if (!kitten.movingClockwise && newPosition >= maxWidth) {
				return true;
			}
		}
		else {
			if (kitten.movingClockwise && newPosition >= maxHeight) {
				return true;
			} else if (!kitten.movingClockwise && newPosition <= 0) {
				return true;
			}
		}
		
		return false;
	}

	function ChangeClimbingSurface() {
		if (kitten.rotation == 0) {
			kitten.rotation = (kitten.movingClockwise) ? 90 : 270;
			//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"climb up wall");
			return;
		}
		else if (kitten.rotation == 90) {
			kitten.rotation = (kitten.movingClockwise) ? 180 : 0;
			//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"climb along floor or ceiling");
			return;
		}
		else if (kitten.rotation == 180) {
			kitten.rotation = (kitten.movingClockwise) ? 270 : 90;
			//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"climb down wall");
			return;
		}
		else {
			kitten.rotation = (kitten.movingClockwise) ? 0 : 180;
			//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"climb along floor or ceiling");
			return;
		}
	}
}

Shimeji.UpdateKittenHelpers = function()
{
	// early return if logic isnt ready yet
	if (!Game.LeftBackground) {
		return;
	}
	
	// 0,0 is the top-left hand side of the canvas.
	// maximum values must account for size of kitten
	var ctx=Game.LeftBackground;
	var maxWidth=ctx.canvas.width - Shimeji.kittenSize;
	var maxHeight=ctx.canvas.height - Shimeji.kittenSize;


	var onKitten=0;

	for (var i in Shimeji.kittenHelpers)
	{
		var kitten=Shimeji.kittenHelpers[i];

		if (kitten.x == null || kitten.y == null) {
			var horizontalCentre = maxWidth/2;
			var randomHorizontalSpawnSlot = Shimeji.getRandomInt(-3, 3);
			var horizontalPos = horizontalCentre + (randomHorizontalSpawnSlot * Shimeji.kittenSize);
			// clamp values
			if (horizontalPos > maxWidth) horizontalPos = maxWidth;
			if (horizontalPos < 0) horizontalPos = 0;

			// default spawn somewhere along the bottom (floor) on the screen
			kitten.x = horizontalPos;
			kitten.y = maxHeight;
		}
		
		// if no longer clicking down
		if (kitten.clickedAtOriginPosition != null && Game.mouseDown === 0) {
			//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"mouse released");
			kitten.clickedAtOriginPosition = null; // reset 'clicked at' position
			if (kitten.currentAction === Shimeji.KittenActions.Drag) {
				// not dragging anymore
				Shimeji.HandleKittenRelease(kitten);
			}
		}

		// If eligible, random chance to enter a new Action
		if (kitten.currentAction !== Shimeji.KittenActions.Drag && 
			kitten.currentAction !== Shimeji.KittenActions.Fall) {
			// If finished currentAction
			if (Date.now() >= kitten.nextActionAvailableAt && Date.now() >= kitten.turningBufferExpiresAt) {
				Shimeji.ChooseNewAction(kitten); //console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"choose your player");
			}
		}

		// Handle movement
		if (kitten.currentAction == Shimeji.KittenActions.Walk) {
			Shimeji.MoveKitten(kitten);
		}
		
		// Handle falling
		if (kitten.currentAction == Shimeji.KittenActions.Fall) {
			Shimeji.DropKitten(kitten);
		}
		
		// Handle dragging
		if (kitten.currentAction == Shimeji.KittenActions.Drag) {
			Shimeji.DragKitten(kitten);
		}

		// Handle hovering and click
		var rect={w:Shimeji.kittenSize, h:Shimeji.kittenSize, x: kitten.x, y: kitten.y};
		
		if (Game.T%5==0 && Game.CanClick) {
			if (Game.LeftBackground && Game.mouseX<ctx.canvas.width && Shimeji.InSquare(Game.mouseX,Game.mouseY,rect))
				kitten.hovered=1;
			else 
				kitten.hovered=0;
		}
		
		// TODO - this works, but is messy
		if (kitten.hovered && onKitten == 0 && Game.CanClick)
		{
			Game.mousePointer=1;
			if (Game.mouseDown === 1) {
				Shimeji.HandleKittenMouseDown(kitten);
			}
			
			if (Game.Click && Game.lastClickedEl==l('backgroundLeftCanvas')
				&& kitten.currentAction != Shimeji.KittenActions.Drag
				&& kitten.currentAction != Shimeji.KittenActions.Fall) // only squeak if we weren't dragging
			{
				Shimeji.HandleKittenClicked(kitten);
				Game.Click=0;
			}
			onKitten=1;
		}
		
		if (kitten.hovered && onKitten !== 1) {
			Shimeji.HandleKittenHovered(kitten);
		}
		
		if (kitten.currentAction != Shimeji.KittenActions.Drag && kitten.clickedAtOriginPosition != null && Shimeji.DragHasPassedThreshold(kitten.clickedAtOriginPosition)) {
			Shimeji.HandleKittenDrag(kitten);
		}
		
	}
}

Shimeji.BufferBeforeDrag = Shimeji.kittenSize / 2; 

Shimeji.DragHasPassedThreshold = function(originCoordinate) {
	// originCoordinate = {x: int, y: int}
	var result = (
		originCoordinate.x > (Game.mouseX + Shimeji.BufferBeforeDrag)
	|| originCoordinate.x < (Game.mouseX - Shimeji.BufferBeforeDrag)
	|| originCoordinate.y > (Game.mouseY + Shimeji.BufferBeforeDrag)
	|| originCoordinate.y < (Game.mouseY - Shimeji.BufferBeforeDrag)
	);

	//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+result + " = " +originCoordinate.x + " " + originCoordinate.y + " : " + Game.mouseX + " " + Game.mouseY);
	return result;
}

Shimeji.HandleKittenHovered = function(kitten) {

}

Shimeji.HandleKittenMouseDown = function(kitten) {
	//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"mousedown");
	if (kitten.clickedAtOriginPosition == null) {
		kitten.clickedAtOriginPosition = {x: Game.mouseX, y: Game.mouseY}; // only set this the first time (in case multiple click events register for the same mousedown event
	}
}

Shimeji.HandleKittenClicked = function(kitten) {
	//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"meow click");
	if (kitten.clickedAtOriginPosition == null) {
		kitten.clickedAtOriginPosition = {x: Game.mouseX, y: Game.mouseY}; // only set this the first time (in case multiple click events register for the same mousedown event
	}
	
	Shimeji.playMeowSound();
	if (kitten.currentAction != Shimeji.KittenActions.Walk
	&& kitten.currentAction != Shimeji.KittenActions.Drag
	&& kitten.currentAction != Shimeji.KittenActions.Fall) {

		// Attennshun! Jolt your kitty awake by clicking them.
		Shimeji.ChangeAction(kitten, Shimeji.KittenActions.Walk, 4);
	}
	else {
		kitten.movingClockwise = !kitten.movingClockwise;
	}
}

Shimeji.HandleKittenDrag = function(kitten) {
	//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+'drag!');
	kitten.rotation = 0; // cats fall on their feet, didn't you know?
	Shimeji.ChangeAction(kitten, Shimeji.KittenActions.Drag, 0);
}

Shimeji.HandleKittenRelease = function(kitten) {
	//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+'fall!');
	Shimeji.ChangeAction(kitten, Shimeji.KittenActions.Fall, 0);
}

Shimeji.DragKitten = function(kitten) {
	var offset = Shimeji.kittenSize / 2;

	const ctx=Game.LeftBackground;
	const maxWidth=ctx.canvas.width - offset;
	
	if (Game.mouseX > maxWidth) {
		// force release them, if they are going to be pulled off the Left background canvas
		Shimeji.HandleKittenRelease(kitten);
		return;
	}
	
	// grab them by the scruff (the centre of their sprite)
	kitten.x = Game.mouseX - offset;
	kitten.y = Game.mouseY - offset; // todo - test this
}

Shimeji.DropKitten = function(kitten) {
	// 0,0 is the top-left hand side of the canvas.
	// maximum values must account for size of kitten
	const ctx=Game.LeftBackground;
	const maxHeight=ctx.canvas.height - Shimeji.kittenSize;

	// try to drop towards y = maxheight
	let targetPosition = kitten.y + Shimeji.kittenFallSpeed;

	// if we are going to overshoot the ground, clamp to maxheight
	if (targetPosition > maxHeight) {
		targetPosition = maxHeight;
	}

	// perform subtraction
	kitten.y = targetPosition;
	
	if (kitten.y === maxHeight) {
		// check for max height / if we've hit ground
		// if so, 
		Shimeji.ChooseNewAction(kitten);
	}
}

// Here is where we handle the probability of our kitty choosing a new action
Shimeji.ChooseNewAction = function(kitten) {
	var newAction;
	var actionLength;
	const chanceOfNewAction = Shimeji.getRandomInt(1, 8);

	// can only be done on ground
	if (kitten.rotation == 0) {
		// stops to dream (floor-only)
		if (chanceOfNewAction <= 3) {
			newAction = Shimeji.KittenActions.Dream;
			actionLength = Shimeji.getRandomInt(3, 8); // in seconds

			//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"New action: "+newAction);
			Shimeji.ChangeAction(kitten, newAction, actionLength);
			return;
		}
	}
	
	// idle in place
	if (chanceOfNewAction <= 4) {
		newAction = Shimeji.KittenActions.Idle;
		actionLength = Shimeji.getRandomInt(3, 8); // in seconds
	}
	// turns around
	else if (chanceOfNewAction <= 7) {
		kitten.movingClockwise = !kitten.movingClockwise;
		newAction = Shimeji.KittenActions.Walk;
		actionLength = Shimeji.getRandomInt(3, 8); // in seconds
	}
	// continues walking
	else {
		newAction = Shimeji.KittenActions.Walk;
		actionLength = Shimeji.getRandomInt(3, 8); // in seconds
	}

	//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"New action: "+newAction);
	Shimeji.ChangeAction(kitten, newAction, actionLength);
}

Shimeji.ChangeAction = function (kitten, action, actionLength) {
	let newAction = action;

	if (newAction !== kitten.currentAction) {
		kitten.changedAction = true;
	}

	kitten.currentAction = newAction;
	kitten.nextActionAvailableAt = Date.now() + (actionLength * 1000);
}

Shimeji.DrawKittenHelpers = function()
{
	var ctx=Game.LeftBackground;
	var selected=0;
	
	// Draw them!
	for (var i in Shimeji.kittenHelpers)
	{
		var kitten=Shimeji.kittenHelpers[i];

		ctx.save();
		
		// Find kitten type
		var kittenType = 1; // Future improvement - different sprites for different kitten.type ?;
		
		// Find current action
		var kittenAction = kitten.currentAction;
		
		// Start building up the directory to find our animation
		var picDirectory = `${this.dir}/kittens/${kittenType}/${kittenAction}/`;
		
		// An additional directory if we are walking or idle
		if (kittenAction == Shimeji.KittenActions.Walk || kittenAction == Shimeji.KittenActions.Idle) {
			//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"Rotation: "+kitten.rotation);
			//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"Clockwise: "+kitten.movingClockwise);
			switch (kitten.rotation) {
				case 90: picDirectory += "rightwall/"; break;
				case 180: picDirectory += "ceiling/"; break;
				case 270: picDirectory += "leftwall/"; break;
				default: picDirectory += "floor/"; break;
			}
			
			picDirectory += (kitten.movingClockwise) ? "forwards/" : "backwards/";
		}
		
		// TODO - deltatime, rather than every frame and relying on Game.fps=30;
		
		// Handle Animation frames here
		if (kitten.changedAction) {
			// start back at frame 1 if we have changed to a new action
			kitten.lastFrame = 1;
			kitten.changedAction = false;
		}
		else {
			// else, continue to next frame
			kitten.lastFrame += 1;
		}
		
		// Attempt to find next frame
		let picSource = picDirectory + kitten.lastFrame + ".png";
		var pic = Pic(picSource);

		// TODO - a better solution... this one kinda sucks and causes errors in the console (and slight flickering)
		// If we have gone too high...
		if (!pic.complete) {
			// reset frames back to frame 1
			kitten.lastFrame = 1;
			picSource = picDirectory + kitten.lastFrame + ".png";
			pic = Pic(picSource);
		}
		
		ctx.drawImage(pic, kitten.x, kitten.y, Shimeji.kittenSize, Shimeji.kittenSize);
		
		ctx.restore();
		
		if (kitten.hovered) selected=kitten;
	}
}

Shimeji.playMeowSound = function()
{
	PlaySound(this.dir + '/meow'+Shimeji.meowSound+'.mp3',0.5);
	Shimeji.meowSound+=Math.floor(Math.random()*1.5)+1;
	if (Shimeji.meowSound>4) Shimeji.meowSound-=4;
}

// --- Pusheen Shimeji Settings state ---
var pusheenMatchKittensToShopCount = true;  // default: match kitten helpers
var pusheenCustomCount = 5;      // default custom count
var maxPusheen = 15; // number of supported kitten types in this mod (see: CheckForNewKittenHelpers method)

function buildPusheenSettingsHTML() {
    var html = '<div class="listing">';
    
    // Toggle button - matches Cookie Clicker's ON/OFF button style
    html += '<a class="option smallFancyButton" id="pusheenMatchToggle" onclick="pusheenToggleMatch();PlaySound(\'snd/tick.mp3\');">'
          + (pusheenMatchKittensToShopCount ? 'Match kitten helpers ON' : 'Match kitten helpers OFF')
          + '</a>';
    html += ' <label>Match the number of pusheen onscreen to the number of kitten helpers bought in Store. (Disable this to configure a custom number of pusheen)</label>';
    
    // Slider - only shown when match is OFF
    if (!pusheenMatchKittensToShopCount) {    	
        html += '<div class="listing" id="pusheenSliderWrap" style="margin-top:4px;">';
        html += '<b>Custom pusheen count: <span id="pusheenCountDisplay">' + pusheenCustomCount + '</span></b><br>';
        html += '<input type="range" min="0" max="'+ maxPusheen +'" value="' + pusheenCustomCount + '" '
              + 'oninput="pusheenCustomCount=parseInt(this.value);document.getElementById(\'pusheenCountDisplay\').textContent=this.value;UpdateNumberOfPusheenKittensToMatchCustomSetting();" '
              + 'style="width:200px;vertical-align:middle;">';
        html += '</div>';
    }
    
    html += '</div>';
    return html;
}

function pusheenToggleMatch() {
	// if toggling from ON to OFF, set pusheenCustomCount to be current count of kittens.
	if (pusheenMatchKittensToShopCount) { 
		pusheenCustomCount = Shimeji.kittenHelpers.length;
	}	
	// perform TOGGLE
    pusheenMatchKittensToShopCount = !pusheenMatchKittensToShopCount;
    var wrap = document.getElementById('pusheenSettingsWrap');
    if (wrap) wrap.innerHTML = buildPusheenSettingsHTML();
    // if toggled ON,
    if (pusheenMatchKittensToShopCount) {
    	UpdateNumberOfPusheenKittensToMatchShop();    
    }
}

function UpdateNumberOfPusheenKittensToMatchCustomSetting() {
	if (pusheenMatchKittensToShopCount){
		return; //early out
	}
	if (Shimeji.kittenHelpers.length < pusheenCustomCount) {
		//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"spawn more kittens - custom count");
		var difference = pusheenCustomCount - Shimeji.kittenHelpers.length;
		for (var i = 0; i < difference; i++)
		{
			Shimeji.SpawnKittenHelper(Shimeji.KittenTypes.Angels); // hack in case they want more kittens than they've unlocked in the shop.
		}
	}
	else if (pusheenCustomCount < Shimeji.kittenHelpers.length) {
		//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"delete more kittens - custom count");
		var difference = Shimeji.kittenHelpers.length - pusheenCustomCount;
		Shimeji.RemoveKittens(difference);
	}
	console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+'Pusheens in game updated to:', Shimeji.kittenHelpers.length);
}

function UpdateNumberOfPusheenKittensToMatchShop() {
	if (!pusheenMatchKittensToShopCount){
		return; //early out
	}
	if (Shimeji.kittenHelpers.length > GetCurrentShopCountOfKittens()) {
		//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"delete kittens - match shop count");
		var difference = Shimeji.kittenHelpers.length - GetCurrentShopCountOfKittens();
		Shimeji.RemoveKittens(difference);
	}
	else {
		//console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"spawn more kittens - match shop count");
		Shimeji.CheckForNewKittenHelpers();
	}
	console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+'Pusheens in game updated to:', Shimeji.kittenHelpers.length);
}


// --- Pusheen Shimeji init ---

Shimeji.init = function()
{
    Game.Notify(Shimeji.name + ' v' + Shimeji.version + ' loaded!', '', 7);
	console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"Got milk?");

    // Hooks
	Game.registerHook('logic',function(){
        Shimeji.UpdateKittenHelpers();
    });

    Game.registerHook('draw',function(){
        Shimeji.DrawKittenHelpers();
    });

	Game.registerHook('check',function(){
		Shimeji.CheckForNewKittenHelpers();
	});

	var _UpdateMenu = Game.UpdateMenu;
	Game.UpdateMenu = function() {
		_UpdateMenu();
		if (Game.onMenu == 'prefs') {
			var modsSection = null;
			var titles = document.querySelectorAll('#menu .title');
			for (var i = 0; i < titles.length; i++) {
				if (titles[i].textContent.trim() === 'Mods') {
					modsSection = titles[i].parentElement;
					break;
				}
			}
			if (modsSection) {
				var modsTitle = modsSection.querySelector('.title');
			    var wrapper = document.createElement('div');
			    wrapper.id = 'pusheenSettingsWrap';
			    wrapper.innerHTML = buildPusheenSettingsHTML();
			    modsTitle.insertAdjacentElement('afterend', wrapper);
			}
			else {
				console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"did not find mod section");
			}
		}
	};

	// Called on mod init
	Shimeji.CheckForNewKittenHelpers();

}
Shimeji.save = function(){
	console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"save mod settings");

	return JSON.stringify({
        matchKittens: pusheenMatchKittensToShopCount,
        customCount: pusheenCustomCount
    	});
}

Shimeji.load = function(str){
	console.log("[Pusheen Shimeji Mod - ID: shimejiMod] "+"load & apply mod settings");

	var data = JSON.parse(str);
    pusheenMatchKittensToShopCount = data.matchKittens;
    pusheenCustomCount = data.customCount;

    if (pusheenMatchKittensToShopCount) {
    	UpdateNumberOfPusheenKittensToMatchShop();
    }
    else {
    	UpdateNumberOfPusheenKittensToMatchCustomSetting();
    }
}

Game.registerMod(Shimeji.modid, Shimeji);