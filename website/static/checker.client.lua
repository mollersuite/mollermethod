-- check for varargs

if loadstring('return ...')(true) == true then
	print('varargs supported')
else
	error('custom assets not supported')
end

-- check for writefile and getcustomasset

if (getcustomasset or getsynasset) then
	print('custom assets supported')
else
	error('custom assets not supported')
end

print('Your exploit supports mollermethod!')