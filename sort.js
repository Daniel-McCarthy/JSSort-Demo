var paused = false;
var step = false;

var descendingTest = [];
var gnomeData = [];
var selectionData = [];




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
	gnomeData = descendingTest.slice();
	selectionData = descendingTest.slice();
	
	//Init Gnome
	gnomeIndex = 0;
	
	//Init Selection
	closestValue = 0;
	closestIndex = 0;
	selectionIndex = 0;
	selectionSecondIndex = 0;
	selectionSwapNeeded = false;
	
	
	(paused)
	{
		pauseSorts();
	}
}

function clearGraphs()
{
	var gnomeContext = document.getElementById("gnomeGraph").getContext("2d");
	
	gnomeContext.fillStyle = "white";
	gnomeContext.fillRect(0, 0, 100, 256);
	
	var selectionContext = document.getElementById("selectionGraph").getContext("2d");

	selectionContext.fillStyle = "white";
	selectionContext.fillRect(0, 0, 100, 256);
	
}

function updateGraphs()
{
	var gnomeContext = document.getElementById("gnomeGraph").getContext("2d");
	var selectionContext = document.getElementById("selectionGraph").getContext("2d");
	clearGraphs();
	
	for(var i = 0; i < gnomeData.length; i++)
	{
		gnomeContext.fillStyle = "black";
		gnomeContext.fillRect(i, (256)-gnomeData[i], 1, 1);
	}
	
	for(var i = 0; i < selectionData.length; i++)
	{
		selectionContext.fillStyle = "black";
		selectionContext.fillRect(i, (256)-selectionData[i], 1, 1);
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

	
	return i;
}

function sleep() {}

function isSorted(data)
{
	var sorted = true;
	for(var i = 1; i < data.length; i++)
	{
			if(data[i - 1] > data[i])
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
	gnomeData = descendingTest.slice();
	setInterval(stepAlgorithms, 1);
}

function stepAlgorithms()
{
	if(!paused || (paused && step))
	{
		if(!isSorted(gnomeData))
		{
			gnomeIndex = gnomeStep(gnomeData, gnomeIndex);
			updateGnomeGraph();
			step = false;
		}
	}
}
