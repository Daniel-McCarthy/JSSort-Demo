var paused = false;
var step = false;
var isRandomTestType = false;
var isLineMode = false;

var descendingTest = [];
var randomTest =
[27, 42,  5, 19, 32,
  4, 54, 48, 17, 61,
 64, 47, 37, 44,  3,
 85, 74,  8, 70, 29,
 23, 34, 16, 26,  9,
 30, 55, 39, 13, 10,
 50, 15, 80, 41, 77,
 36,  0, 63, 58, 69,
 12,  7, 68, 21, 22,
 81, 25, 65, 53, 11,
 46, 84, 75, 49, 71,
 72, 89,  6, 52, 14,
 31, 43, 86, 33, 93,
 56, 57, 78, 94, 59,
 20, 83, 90, 88, 60,
 62, 91, 96,  2, 76, 
 97, 95, 28, 45, 35,
 92, 99, 82, 38, 24,
 98, 73, 66, 79, 18,
  1, 67, 51, 87, 40 ];
  

var gnomeData = [];
var selectionData = [];
var insertionData = [];
var bubbleData = [];
var combData = [];
var shellData = [];
var oddEvenData = [];



function initDescendingTest()
{
	for(var i = 0; i < 100; i++)
	{
		descendingTest[i] = 100 - i;
	}
}

function startSorts()
{
	if(!paused)
	{
		pauseSorts();
	}
	clearGraphs();
	initDescendingTest();
	
	if(!isRandomTestType)
	{
		gnomeData = descendingTest.slice();
		selectionData = descendingTest.slice();
		insertionData = descendingTest.slice();
		bubbleData = descendingTest.slice();
		combData = descendingTest.slice();
		shellData = descendingTest.slice();
		oddEvenData = descendingTest.slice();
	}
	else
	{
		gnomeData = randomTest.slice();
		selectionData = randomTest.slice();
		insertionData = randomTest.slice();
		bubbleData = randomTest.slice();
		combData = randomTest.slice();
		shellData = randomTest.slice();
		oddEvenData = randomTest.slice();
	}
	
	//Init Gnome
	gnomeIndex = 0;
	
	//Init Selection
	closestValue = 0;
	closestIndex = 0;
	selectionIndex = 0;
	selectionSecondIndex = 0;
	selectionSwapNeeded = false;
	
	//Init Insertion
	insertionIndex = 1;
    insertionSecondIndex = 0;
    insertionSwapNeeded = false;
	insertionFirstRun = true;
	
	//Init Bucket
	bubbleIndex = 1;
	
	//Init Comb
	combIndex = 0;
	combWidth = 19;
	
	//Init Shell
	shellIndex = 0;
	shellInitialRun = true;

	
	(paused)
	{
		pauseSorts();
	}
}

function clearGraphs()
{
	var gnomeContext = document.getElementById("gnomeGraph").getContext("2d");
	
	gnomeContext.fillStyle = "white";
	gnomeContext.fillRect(0, 0, 100*2, 100*2);
	
	var selectionContext = document.getElementById("selectionGraph").getContext("2d");

	selectionContext.fillStyle = "white";
	selectionContext.fillRect(0, 0, 100*2, 100*2);
	
	var insertionContext = document.getElementById("insertionGraph").getContext("2d");

	insertionContext.fillStyle = "white";
	insertionContext.fillRect(0, 0, 100*2, 100*2);
	
	var bubbleContext = document.getElementById("bubbleGraph").getContext("2d");

	bubbleContext.fillStyle = "white";
	bubbleContext.fillRect(0, 0, 100*2, 100*2);
	
	var combContext = document.getElementById("combGraph").getContext("2d");

	combContext.fillStyle = "white";
	combContext.fillRect(0, 0, 100*2, 100*2);
	
	var shellContext = document.getElementById("shellGraph").getContext("2d");

	shellContext.fillStyle = "white";
	shellContext.fillRect(0, 0, 100*2, 100*2);
}

function updateGraphs()
{
	var gnomeContext = document.getElementById("gnomeGraph").getContext("2d");
	var selectionContext = document.getElementById("selectionGraph").getContext("2d");
	var insertionContext = document.getElementById("insertionGraph").getContext("2d");
	var bubbleContext = document.getElementById("bubbleGraph").getContext("2d");
	var combContext = document.getElementById("combGraph").getContext("2d");
	var shellContext = document.getElementById("shellGraph").getContext("2d");
	clearGraphs();
	
	if(isLineMode)
	{
		for(var i = 0; i < gnomeData.length; i++)
		{
			gnomeContext.fillStyle = "black";
			gnomeContext.fillRect(i*2, (100*2)-(gnomeData[i]*2), 1*2, gnomeData[i]*2);
		}
		
		for(var i = 0; i < selectionData.length; i++)
		{
			selectionContext.fillStyle = "black";
			selectionContext.fillRect(i*2, (100*2)-(selectionData[i]*2), 1*2, selectionData[i]*2);
		}
		
		for(var i = 0; i < insertionData.length; i++)
		{
			insertionContext.fillStyle = "black";
			insertionContext.fillRect(i*2, (100*2)-(insertionData[i]*2), 1*2, insertionData[i]*2);
		}
		
		for(var i = 0; i < bubbleData.length; i++)
		{
			bubbleContext.fillStyle = "black";
			bubbleContext.fillRect(i*2, (100*2)-(bubbleData[i]*2), 1*2, bubbleData[i]*2);
		}
		
		for(var i = 0; i < combData.length; i++)
		{
			combContext.fillStyle = "black";
			combContext.fillRect(i*2, (100*2)-(combData[i]*2), 1*2, combData[i]*2);
		}
		
		for(var i = 0; i < shellData.length; i++)
		{
			shellContext.fillStyle = "black";
			shellContext.fillRect(i*2, (100*2)-(shellData[i]*2), 1*2, shellData[i]*2);
		}
	}
	else
	{
		for(var i = 0; i < gnomeData.length; i++)
	{
		gnomeContext.fillStyle = "black";
		gnomeContext.fillRect(i*2, (100*2)-(gnomeData[i]*2), 1*2, 1*2);
	}
	
	for(var i = 0; i < selectionData.length; i++)
	{
		selectionContext.fillStyle = "black";
		selectionContext.fillRect(i*2, (100*2)-(selectionData[i]*2), 1*2, 1*2);
	}
	
	for(var i = 0; i < insertionData.length; i++)
	{
		insertionContext.fillStyle = "black";
		insertionContext.fillRect(i*2, (100*2)-(insertionData[i]*2), 1*2, 1*2);
	}
	
	for(var i = 0; i < bubbleData.length; i++)
	{
		bubbleContext.fillStyle = "black";
		bubbleContext.fillRect(i*2, (100*2)-(bubbleData[i]*2), 1*2, 1*2);
	}
	
	for(var i = 0; i < combData.length; i++)
	{
		combContext.fillStyle = "black";
		combContext.fillRect(i*2, (100*2)-(combData[i]*2), 1*2, 1*2);
	}
	
	for(var i = 0; i < combData.length; i++)
	{
		shellContext.fillStyle = "black";
		shellContext.fillRect(i*2, (100*2)-(shellData[i]*2), 1*2, 1*2);
	}
	}
}

function sortStep()
{
	step = true;
}

function pauseSorts()
{
	paused = !paused;
	
	if(paused)
	{
		document.getElementById("pauseButton").value = "Resume";
	}
	else
	{
		document.getElementById("pauseButton").value = "Pause";
	}
}

var gnomeIndex = 0;

function gnomeStep()
{
	var c = 0;
	
	if((gnomeIndex == 0) || (gnomeData[gnomeIndex]) >= gnomeData[gnomeIndex - 1])
	{
		gnomeIndex++;
	}
	else
	{
		c = gnomeData[gnomeIndex];
		gnomeData[gnomeIndex] = gnomeData[gnomeIndex - 1];
		gnomeData[gnomeIndex - 1] = c;
		gnomeIndex--;
	}

}

var closestValue = 0;
var closestIndex = 0;
var selectionIndex = 0;
var selectionSecondIndex = 0;
var selectionSwapNeeded = false;

function selectionStep()
{
	var c = 0;
	
	if(selectionIndex == 0 && selectionSecondIndex == 0)
	{

		closestValue = selectionData[selectionIndex];
		closestIndex = selectionIndex;
	}
	
	if((selectionSecondIndex + 1) < selectionData.length)
	{
		if(selectionData[selectionSecondIndex] < closestValue)
		{
			closestValue = selectionData[selectionSecondIndex];
			closestIndex = selectionSecondIndex;
			selectionSwapNeeded = true;
		}
		selectionSecondIndex++;
	}
	else
	{
		if(selectionSwapNeeded)
		{
			c = selectionData[selectionIndex];
			selectionData[selectionIndex] = selectionData[closestIndex];
			selectionData[closestIndex] = c;
		}
		
		selectionSwapNeeded = false;
	
		selectionIndex++;
		selectionSecondIndex = selectionIndex + 1;
		
		closestValue = selectionData[selectionIndex];
		closestIndex = selectionIndex;

	}

	
}

var insertionIndex = 1;
var insertionSecondIndex = 0;
var insertionSwapNeeded = false;
var insertionFirstRun = true;

function insertionStep()
{
	var c = 0;
	
	if(insertionFirstRun)
	{
		insertionSwapNeeded = insertionData[insertionIndex] < insertionData[insertionIndex - 1];
		insertionSecondIndex = insertionIndex;
		insertionFirstRun = false;
	}
	
	if(insertionSwapNeeded)
	{
		c = insertionData[insertionSecondIndex - 1];
		insertionData[insertionSecondIndex - 1] = insertionData[insertionSecondIndex];
		insertionData[insertionSecondIndex] = c;
		
		insertionSecondIndex--;
		
		if(insertionSecondIndex > 0)
		{
			insertionSwapNeeded = insertionData[insertionSecondIndex] < insertionData[insertionSecondIndex - 1];
		}
		else
		{
			insertionSwapNeeded = false;
		}
	}
	else
	{
		insertionIndex++;
		insertionSwapNeeded = insertionData[insertionIndex] < insertionData[insertionIndex - 1];
		insertionSecondIndex = insertionIndex;
	}
}

var bubbleIndex = 1;

function bubbleStep()
{
	var c = 0;
	
	if (bubbleIndex >= bubbleData.length)
	{
		bubbleIndex = 1;
	}
	
	if(bubbleData[bubbleIndex - 1] > bubbleData[bubbleIndex])
	{
		c = bubbleData[bubbleIndex - 1];
		bubbleData[bubbleIndex - 1] = bubbleData[bubbleIndex];
		bubbleData[bubbleIndex] = c;
	}
	
	bubbleIndex++;
	
}

var combIndex = 0;
var combWidth = 19;

function combStep()
{
	if((combIndex + combWidth) < combData.length)
	{
		if(combData[combIndex] > combData[combIndex + combWidth])
		{
			c = combData[combIndex];
			combData[combIndex] = combData[combIndex + combWidth];
			combData[combIndex + combWidth] = c;
		}
		
		combIndex++;
	}
	else
	{
		combWidth--;
		combIndex = 0;
	}
	
}

var shellInitialRun = true;
var shellIndex = 0;
var shellSecondaryIndex = 0;
var shellGap = 0;

var shellC = 0;
function shellStep()
{
	if(shellInitialRun)
	{
		shellGap = shellData.length / 2;
		shellIndex = 0;
		shellSecondaryIndex = shellGap + shellIndex;
		shellC = shellData[shellSecondaryIndex];
		shellInitialRun = false;
	}

	if((shellGap + shellIndex) < shellData.length)
	{
		
		if((shellSecondaryIndex >= shellGap) && (shellC < shellData[shellSecondaryIndex - shellGap]))
		{
			shellData[shellSecondaryIndex] = shellData[shellSecondaryIndex - shellGap];
			shellSecondaryIndex -= shellGap;
		}
		else
		{
			shellData[shellSecondaryIndex] = shellC;
			shellIndex++;
			shellSecondaryIndex = shellGap + shellIndex;
			shellC = shellData[shellSecondaryIndex];
		}


	}
	else
	{
		shellGap = Math.floor(shellGap/2);
		shellIndex = 0;
		shellSecondaryIndex = shellGap + shellIndex;
		shellC = shellData[shellSecondaryIndex];
	}
}

function sleep() {}

function isSorted(data)
{
	var sorted = true;
	for(var i = 1; i < data.length; i++)
	{
			if(data[i - 1] >= data[i])
			{
				sorted = false;
			}
	}
	
	return sorted;
}

function startTimer()
{
	pauseSorts();
	
	clearGraphs();
	initDescendingTest();
	
	if(!isRandomTestType)
	{
		gnomeData = descendingTest.slice();
		selectionData = descendingTest.slice();
		insertionData = descendingTest.slice();
		bubbleData = descendingTest.slice();
		combData = descendingTest.slice();
		shellData = descendingTest.slice();
		oddEvenData = descendingTest.slice();
	}
	else
	{
		gnomeData = randomTest.slice();
		selectionData = randomTest.slice();
		insertionData = randomTest.slice();
		bubbleData = randomTest.slice();
		combData = randomTest.slice();
		shellData = randomTest.slice();
		oddEvenData = randomTest.slice();
	}
	
	setInterval(stepAlgorithms, 0);
}

function stepAlgorithms()
{
	if(!paused || (paused && step))
	{
		if(!isSorted(gnomeData))
		{
			gnomeStep();
		}
		
		if(!isSorted(selectionData))
		{
			selectionStep();
		}
		
		if(!isSorted(insertionData))
		{
			insertionStep();
		}
		
		if(!isSorted(bubbleData))
		{
			bubbleStep();
		}

		if(!isSorted(combData))
		{
			combStep();
		}
		
		if(!isSorted(shellData))
		{
			shellStep();
		}
		
		if(!isSorted(oddEvenData))
		{
			oddEvenStep();
		}
		
		updateGraphs();
		step = false;
	}
}

function swapTestType()
{
	isRandomTestType = !isRandomTestType;
}

function swapDrawingType()
{
	isLineMode = !isLineMode;
}